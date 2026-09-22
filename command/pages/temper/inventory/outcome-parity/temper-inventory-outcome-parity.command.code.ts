import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/command/argument/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/command/argument/pages/inventory-path.argument.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventoryOutcomeParity as page } from "akasha/command/pages/temper/inventory/outcome-parity/temper-inventory-outcome-parity.command.ts"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  explainCapabilities,
} from "akasha/temper/command/modules/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import type { WalkOutcome } from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"

const NAMED = [inventoryPathArgument, charactersPathArgument]

const INVENTORY_LUA = "TemperItems.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const ABSENT = "-"

interface Divergence {
  readonly itemId: number
  readonly itemName: string
  readonly location: string
  readonly full: string
  readonly stopped: string
}

interface Tally {
  items: number
  matched: number
  indeterminate: number
  nothing: number
}

function matchSaid(one: {
  readonly rule: { readonly index: number }
  readonly action: string
  readonly destination?: string
  readonly targetQuantity?: number
  readonly label: string
}): string {
  return [
    String(one.rule.index),
    one.action,
    one.destination ?? ABSENT,
    one.targetQuantity === undefined ? ABSENT : String(one.targetQuantity),
    one.label,
  ].join("/")
}

function outcomeSaid(outcome: WalkOutcome): string {
  if (outcome.kind === "matched") {
    return `matched|${matchSaid(outcome)}`
  }
  if (outcome.kind === "implicit-terminal") {
    return `implicit-terminal|${outcome.action}|${outcome.label}`
  }
  const unsure = outcome.indeterminateRules
    .map((one) => {
      const verdict = one.verdict
      const why = verdict.kind === "indeterminate" ? verdict.reason.kind : verdict.kind
      return `${String(one.index)}:${why}`
    })
    .join(",")
  const provisional = outcome.provisionalMatch
  return `indeterminate|${unsure}|${provisional === undefined ? ABSENT : matchSaid(provisional)}`
}

function countedInto(tally: Tally, outcome: WalkOutcome): undefined {
  tally.items++
  if (outcome.kind === "matched") {
    tally.matched++
    return
  }
  if (outcome.kind === "indeterminate") {
    tally.indeterminate++
    return
  }
  tally.nothing++
}

function tallySaid(tally: Tally): string {
  return (
    `${String(tally.items)} items ruled on: ` +
    `matched ${String(tally.matched)}, ` +
    `indeterminate ${String(tally.indeterminate)}, ` +
    `nothing ${String(tally.nothing)}`
  )
}

function divergenceSaid(rows: readonly Divergence[]): readonly string[] {
  if (rows.length === 0) return ["DIVERGENCE", "  (none)"]
  return [
    "DIVERGENCE",
    ...rows.map(
      (one) =>
        `  ${one.itemName} (${String(one.itemId)}) at ${one.location}\n` +
        `    full    ${one.full}\n` +
        `    stopped ${one.stopped}`
    ),
  ]
}

export async function temperInventoryOutcomeParity(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const root = resolve(given.root)
  const inventoryPath =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(root, taken.inventoryPath)
  const charactersPath =
    taken.charactersPath === undefined
      ? savedVarsFile(CHARACTERS_LUA)
      : resolve(root, taken.charactersPath)

  let content: string
  try {
    content = await readFile(inventoryPath, "utf8")
  } catch (thrown) {
    return refused(`${INVENTORY_LUA} at ${inventoryPath} would not open — ${whyOf(thrown)}`, DATA)
  }

  try {
    const caps = await explainCapabilities()
    const db = caps.parseInventoryContent(content)
    const config = await caps.loadTemperItemsConfigFromPath(inventoryPath)
    const characters = await caps.loadTemperCharactersFromPath(charactersPath)
    const charactersById = new Map<string, CharacterKnowledge>(
      characters.map((one) => [one.id, one])
    )
    const env = caps.buildCliEvalEnv({
      charactersById,
      characterPriority: config.characterPriority,
      wantedConsumables: config.wantedConsumables,
      wantedEquipment: config.wantedEquipment,
      wantedCompanionEquipment: config.wantedCompanionEquipment,
      db,
    })
    const held = allBagItems(caps, db)
    const factsOf = ({ item, location }: (typeof held)[number]) =>
      caps.cliItemFactsFromInventoryItem(item, caps.classifyItemToNodeIds(item), location)
    const stockGroupByRuleId = caps.computeStockGroups(config.orderedRules, held, factsOf, env)

    const tally: Tally = { items: 0, matched: 0, indeterminate: 0, nothing: 0 }
    const rows: Divergence[] = []
    for (const one of held) {
      const facts = factsOf(one)
      const ctx = { env, stockGroupByRuleId }
      const full = caps.walkRules(config.orderedRules, facts, ctx).outcome
      const stopped = caps.matchRules(config.orderedRules, facts, ctx)
      countedInto(tally, full)
      const fullSaid = outcomeSaid(full)
      const stoppedSaid = outcomeSaid(stopped)
      if (fullSaid === stoppedSaid) continue
      rows.push({
        itemId: one.item.itemId,
        itemName: one.item.itemName,
        location: String(one.location),
        full: fullSaid,
        stopped: stoppedSaid,
      })
    }

    const report = [
      `outcome parity over ${inventoryPath}`,
      `${String(config.orderedRules.length)} rules, ${tallySaid(tally)}`,
      "",
      ...divergenceSaid(rows),
    ]
    if (rows.length === 0) return told(report)
    return answeredWith(
      report,
      [
        `${String(rows.length)} of ${String(tally.items)} items reach a different outcome ` +
          "when the run stops at the first match, and the rows above name them",
      ],
      DATA
    )
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
