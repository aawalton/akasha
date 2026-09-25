import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/command/argument/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { json as jsonArgument } from "akasha/command/argument/pages/json.argument.ts"
import {
  answeredWith,
  asJson,
  DATA,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventoryEnvParity as page } from "akasha/command/pages/temper/inventory/env-parity/temper-inventory-env-parity.command.ts"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  explainCapabilities,
} from "akasha/temper/command/modules/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import {
  buildMatcherContext,
  classifyInventoryForMatcher,
} from "akasha/temper/command/modules/inventory-plan-inputs/inventory-plan-inputs.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import type { WalkOutcome } from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"
import {
  buildItemIdToCooldownGroup,
  buildWebEvalEnv,
} from "akasha/temper/items/rules/matcher/modules/web-eval-env/web-eval-env.module.code.ts"

const NAMED = [jsonArgument, inventoryPathArgument, charactersPathArgument]

const INVENTORY_LUA = "TemperItems.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const ABSENT = "-"

const EXPLAIN_SIDE = "explain"

const PLAN_SIDE = "plan"

interface Side {
  readonly kind: string
  readonly action: string | null
  readonly destination: string | null
  readonly detail: string
}

interface EnvParityRow {
  readonly itemId: number
  readonly itemName: string
  readonly stacks: number
  readonly explain: Side
  readonly plan: Side
  readonly destinationAlone: boolean
}

export interface EnvParityJson {
  readonly inventoryPath: string
  readonly rules: number
  readonly items: number
  readonly stacks: number
  readonly agreed: number
  readonly disagreed: number
  readonly destinationAlone: number
  readonly rows: readonly EnvParityRow[]
}

export function sideOf(outcome: WalkOutcome): Side {
  if (outcome.kind === "matched") {
    return {
      kind: "matched",
      action: outcome.action,
      destination: outcome.destination ?? null,
      detail: `rule ${String(outcome.rule.index)} ${outcome.label}`,
    }
  }
  if (outcome.kind === "implicit-terminal") {
    return {
      kind: "implicit-terminal",
      action: outcome.action,
      destination: null,
      detail: outcome.label,
    }
  }
  const unsure = outcome.indeterminateRules
    .map((one) => {
      const verdict = one.verdict
      if (verdict.kind !== "indeterminate") return `${String(one.index)}:${verdict.kind}`
      const reason = verdict.reason
      const why = "missingSignal" in reason ? reason.missingSignal : reason.kind
      return `${String(one.index)}:${why}`
    })
    .join(",")
  const provisional = outcome.provisionalMatch
  return {
    kind: "indeterminate",
    action: provisional?.action ?? null,
    destination: provisional?.destination ?? null,
    detail: unsure === "" ? ABSENT : unsure,
  }
}

export function sidesAgree(one: Side, two: Side): boolean {
  return one.kind === two.kind && one.action === two.action && one.destination === two.destination
}

export function destinationAlone(one: Side, two: Side): boolean {
  return one.kind === two.kind && one.action === two.action && one.destination !== two.destination
}

function sideSaid(side: Side): string {
  const action = side.action === null ? "" : ` ${side.action}`
  const destination = side.destination === null ? "" : ` to ${side.destination}`
  return `${side.kind}${action}${destination}  (${side.detail})`
}

export interface StackReading {
  readonly itemId: number
  readonly itemName: string
  readonly explain: Side
  readonly plan: Side
}

export function rowsFrom(readings: readonly StackReading[]): readonly EnvParityRow[] {
  const byPair = new Map<string, EnvParityRow>()
  for (const one of readings) {
    if (sidesAgree(one.explain, one.plan)) continue
    const key = `${String(one.itemId)}|${sideSaid(one.explain)}|${sideSaid(one.plan)}`
    const held = byPair.get(key)
    if (held === undefined) {
      byPair.set(key, {
        itemId: one.itemId,
        itemName: one.itemName,
        stacks: 1,
        explain: one.explain,
        plan: one.plan,
        destinationAlone: destinationAlone(one.explain, one.plan),
      })
      continue
    }
    byPair.set(key, { ...held, stacks: held.stacks + 1 })
  }
  return [...byPair.values()].sort((one, two) =>
    one.itemId === two.itemId ? two.stacks - one.stacks : one.itemId - two.itemId
  )
}

export function agreementSaid(items: number): string {
  return (
    `the env ${EXPLAIN_SIDE} runs in and the env ${PLAN_SIDE} runs in decide ` +
    `all ${String(items)} items alike`
  )
}

export function rowsSaid(rows: readonly EnvParityRow[], items: number): readonly string[] {
  if (rows.length === 0) return ["DISAGREEMENT", `  (none) ${agreementSaid(items)}`]
  return [
    "DISAGREEMENT",
    ...rows.map((one) => {
      const stacks = one.stacks === 1 ? "1 stack" : `${String(one.stacks)} stacks`
      const note = one.destinationAlone ? "   the destination alone differs" : ""
      return (
        `  ${one.itemName} (${String(one.itemId)}) over ${stacks}${note}\n` +
        `    ${EXPLAIN_SIDE}  ${sideSaid(one.explain)}\n` +
        `    ${PLAN_SIDE}     ${sideSaid(one.plan)}`
      )
    }),
  ]
}

function foundSaid(out: EnvParityJson): readonly string[] {
  if (out.disagreed === 0) return []
  return [
    `${String(out.disagreed)} of ${String(out.items)} items are decided differently by the two ` +
      "envs, and the rows name them",
  ]
}

export function answerFor(out: EnvParityJson, asOneJsonLine: boolean): Answer {
  const found = foundSaid(out)
  const code = found.length === 0 ? OK : DATA
  if (asOneJsonLine) return asJson(out, found, code)
  return answeredWith(
    [
      `env parity over ${out.inventoryPath}`,
      `${String(out.rules)} rules, ${String(out.items)} items in ${String(out.stacks)} stacks`,
      "",
      ...rowsSaid(out.rows, out.items),
    ],
    found,
    code
  )
}

export async function temperInventoryEnvParity(
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

    const explainEnv = caps.buildCliEvalEnv({
      charactersById,
      characterPriority: config.characterPriority,
      wantedConsumables: config.wantedConsumables,
      wantedEquipment: config.wantedEquipment,
      wantedCompanionEquipment: config.wantedCompanionEquipment,
      db,
    })
    const planEnv = buildWebEvalEnv(buildMatcherContext(config, charactersById, db), {
      itemIdToCooldownGroup: buildItemIdToCooldownGroup(classifyInventoryForMatcher(db)),
    })

    const held = allBagItems(caps, db)
    const factsOf = ({ item, location }: (typeof held)[number]) =>
      caps.cliItemFactsFromInventoryItem(item, caps.classifyItemToNodeIds(item), location)
    const explainGroups = caps.computeStockGroups(config.orderedRules, held, factsOf, explainEnv)
    const planGroups = caps.computeStockGroups(config.orderedRules, held, factsOf, planEnv)

    const readings: StackReading[] = []
    const itemIds = new Set<number>()
    for (const one of held) {
      const facts = factsOf(one)
      itemIds.add(one.item.itemId)
      readings.push({
        itemId: one.item.itemId,
        itemName: one.item.itemName,
        explain: sideOf(
          caps.walkRules(config.orderedRules, facts, {
            env: explainEnv,
            stockGroupByRuleId: explainGroups,
          }).outcome
        ),
        plan: sideOf(
          caps.walkRules(config.orderedRules, facts, {
            env: planEnv,
            stockGroupByRuleId: planGroups,
          }).outcome
        ),
      })
    }

    const rows = rowsFrom(readings)
    const disagreed = new Set(rows.map((one) => one.itemId)).size
    const out: EnvParityJson = {
      inventoryPath,
      rules: config.orderedRules.length,
      items: itemIds.size,
      stacks: held.length,
      agreed: itemIds.size - disagreed,
      disagreed,
      destinationAlone: rows.filter((one) => one.destinationAlone).length,
      rows,
    }
    return answerFor(out, taken.json === true)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
