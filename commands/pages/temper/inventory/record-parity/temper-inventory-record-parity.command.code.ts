import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  answeredWith,
  asJson,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryRecordParity as page } from "akasha/commands/pages/temper/inventory/record-parity/temper-inventory-record-parity.command.ts"
import type { CharacterKnowledge } from "akasha/temper/commands/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  allBagItems,
  explainCapabilities,
} from "akasha/temper/commands/modules/inventory-explain-capabilities/inventory-explain-capabilities.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items-rules-core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/modules/eval-env/eval-env.module.code.ts"
import {
  evaluateRule,
  matchRules,
} from "akasha/temper/items-rules-eval/modules/evaluator/evaluator.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/saved-variables/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/modules/lua-parser/lua-parser.module.code.ts"
import { asRecord } from "akasha/utils/narrow/modules/as-record/as-record.module.code.ts"
import { z } from "zod"

const NAMED = [jsonArgument, inventoryPathArgument, charactersPathArgument]

const INVENTORY_LUA = "TemperInventory.lua"

const CHARACTERS_LUA = "TemperCharacters.lua"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const OUTBOX_KEY = "pendingSettingsMutations"

const ABSENT = "-"

const ORDERED_RULE = "ordered-rule"

const ITEM_RULE = "item-rule"

const VERDICT_OUTBOX = "item-verdict-outbox"

const LOCKED_UNLOCK = "locked-unlock"

const NO_MATCH = "no-match"

const NOTHING = "nothing"

const UNLOCK = "unlock"

const LOCKED = "locked"

const STOCK = "stock"

const BY_PRIORITY = "character:by-priority"

const STOCK_SURPLUS_SINK = "bank"

const ACTION = "action"

const DESTINATION = "destination"

const RULE = "rule"

const OUT_OF_COVERAGE = "OUT OF COVERAGE"

const DISAGREEMENT = "DISAGREEMENT"

export interface Verdict {
  readonly action: string
  readonly destination: string | null
  readonly by: string | null
  readonly ruleIndex: number | null
}

const NO_MATCH_VERDICT: Verdict = {
  action: NOTHING,
  destination: null,
  by: NO_MATCH,
  ruleIndex: null,
}

export interface FreshInputs {
  readonly orderedRules: ReadonlyArray<CompiledOrderedRule>
  readonly itemRuleById: ReadonlyMap<number, ItemRule>
  readonly queuedById: ReadonlyMap<number, string>
  readonly ctx: EvalContext
}

export function verdictRecordedOn(item: InventoryItemData): Verdict | undefined {
  if (item.resolvedAction === undefined) return undefined
  return {
    action: item.resolvedAction,
    destination: item.resolvedDestination ?? null,
    by: item.resolvedBy ?? null,
    ruleIndex: item.resolvedRuleIndex ?? null,
  }
}

export function itemRuleDestination(rule: ItemRule): string | null {
  if (rule.action !== STOCK) return rule.destination ?? null
  const chain = rule.destinationChain
  if (chain !== undefined && chain.length > 0) {
    return planStockChainVisit(chain)?.surplusDestination ?? rule.destination ?? null
  }
  if (rule.destination === BY_PRIORITY) return STOCK_SURPLUS_SINK
  return rule.destination ?? null
}

function unlockedByOrderedRule(facts: ItemFacts, inputs: FreshInputs): Verdict | undefined {
  for (let index = 0; index < inputs.orderedRules.length; index++) {
    const rule = inputs.orderedRules[index]
    if (rule === undefined) continue
    if (rule.locked !== LOCKED || rule.action !== UNLOCK) continue
    const result = evaluateRule(rule, index, facts, inputs.ctx)
    if (result.verdict.kind !== "matched") continue
    return {
      action: UNLOCK,
      destination: result.resolvedDestination ?? rule.destination ?? null,
      by: ORDERED_RULE,
      ruleIndex: index,
    }
  }
  return undefined
}

export function freshVerdictFor(
  item: InventoryItemData,
  facts: ItemFacts,
  inputs: FreshInputs
): Verdict {
  const queued = inputs.queuedById.get(item.itemId)
  const itemRule = inputs.itemRuleById.get(item.itemId)
  if (item.locked === true) {
    if ((queued ?? itemRule?.action) === UNLOCK) {
      return { action: UNLOCK, destination: null, by: LOCKED_UNLOCK, ruleIndex: null }
    }
    return unlockedByOrderedRule(facts, inputs) ?? NO_MATCH_VERDICT
  }
  if (queued !== undefined) {
    return { action: queued, destination: null, by: VERDICT_OUTBOX, ruleIndex: null }
  }
  if (itemRule !== undefined) {
    return {
      action: itemRule.action,
      destination: itemRuleDestination(itemRule),
      by: ITEM_RULE,
      ruleIndex: null,
    }
  }
  const outcome = matchRules(inputs.orderedRules, facts, inputs.ctx)
  if (outcome.kind !== "matched") return NO_MATCH_VERDICT
  return {
    action: outcome.action,
    destination: outcome.destination ?? null,
    by: ORDERED_RULE,
    ruleIndex: outcome.rule.index,
  }
}

export function differingBetween(recorded: Verdict, fresh: Verdict): readonly string[] {
  const out: string[] = []
  if (recorded.action !== fresh.action) out.push(ACTION)
  if (recorded.destination !== fresh.destination) out.push(DESTINATION)
  if (
    recorded.by === ORDERED_RULE &&
    fresh.by === ORDERED_RULE &&
    recorded.ruleIndex !== fresh.ruleIndex
  ) {
    out.push(RULE)
  }
  return out
}

export function verdictSaid(one: Verdict): string {
  const destination = one.destination === null ? "" : ` to ${one.destination}`
  const index = one.ruleIndex === null ? "" : ` ${String(one.ruleIndex)}`
  return `${one.action}${destination}  (${one.by ?? ABSENT}${index})`
}

const QUEUED_VERDICT_SCHEMA = z.object({
  kind: z.literal("item-rule-verdict"),
  itemId: z.number().int(),
  action: z.enum(["nothing", "sell"]),
})

export function queuedVerdictsIn(content: string): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  const defaultTable = asRecord(parseLuaSavedVariablesFile(content, VARIABLES_NAME).Default)
  const accountWide = defaultTable === undefined ? undefined : readFirstAccountWide(defaultTable)
  const outbox = asRecord(accountWide?.[OUTBOX_KEY])
  if (outbox === undefined) return found
  for (const entry of Object.values(outbox)) {
    const read = QUEUED_VERDICT_SCHEMA.safeParse(entry)
    if (read.success && !found.has(read.data.itemId)) found.set(read.data.itemId, read.data.action)
  }
  return found
}

export interface StackReading {
  readonly itemId: number
  readonly itemName: string
  readonly recorded: Verdict
  readonly fresh: Verdict
}

export interface RecordParityRow {
  readonly itemId: number
  readonly itemName: string
  readonly stacks: number
  readonly recorded: Verdict
  readonly fresh: Verdict
  readonly differing: readonly string[]
}

export function rowsFrom(readings: readonly StackReading[]): readonly RecordParityRow[] {
  const byPair = new Map<string, RecordParityRow>()
  for (const one of readings) {
    const differing = differingBetween(one.recorded, one.fresh)
    if (differing.length === 0) continue
    const key = `${String(one.itemId)}|${verdictSaid(one.recorded)}|${verdictSaid(one.fresh)}`
    const held = byPair.get(key)
    if (held === undefined) {
      byPair.set(key, {
        itemId: one.itemId,
        itemName: one.itemName,
        stacks: 1,
        recorded: one.recorded,
        fresh: one.fresh,
        differing,
      })
      continue
    }
    byPair.set(key, { ...held, stacks: held.stacks + 1 })
  }
  return [...byPair.values()].sort((one, two) =>
    one.itemId === two.itemId ? two.stacks - one.stacks : one.itemId - two.itemId
  )
}

export interface Coverage {
  readonly items: number
  readonly stacks: number
  readonly recordedStacks: number
  readonly itemsCompared: number
  readonly itemsUncovered: number
}

export function shareSaid(part: number, whole: number): string {
  if (whole === 0) return "0.0%"
  return `${((part / whole) * 100).toFixed(1)}%`
}

export function coverageSaid(counted: Coverage): readonly string[] {
  return [
    `${String(counted.recordedStacks)} of ${String(counted.stacks)} stacks carry a record, ` +
      `which is ${shareSaid(counted.recordedStacks, counted.stacks)} of what is held`,
    `${String(counted.itemsCompared)} of ${String(counted.items)} items carry one and are ruled on here`,
  ]
}

export function uncoveredSaid(counted: Coverage): readonly string[] {
  if (counted.itemsUncovered === 0) {
    return [OUT_OF_COVERAGE, "  (none) every item held carries a record"]
  }
  return [
    OUT_OF_COVERAGE,
    `  ${String(counted.itemsUncovered)} items carry no record in any stack, and no row ` +
      "below counts one of them",
  ]
}

export function agreementSaid(items: number): string {
  return (
    "the record the addon wrote and a fresh reading reach one answer on all " +
    `${String(items)} items carrying a record`
  )
}

export function rowsSaid(
  rows: readonly RecordParityRow[],
  itemsCompared: number
): readonly string[] {
  if (rows.length === 0) return [DISAGREEMENT, `  (none) ${agreementSaid(itemsCompared)}`]
  return [
    DISAGREEMENT,
    ...rows.map((one) => {
      const stacks = one.stacks === 1 ? "1 stack" : `${String(one.stacks)} stacks`
      return (
        `  ${one.itemName} (${String(one.itemId)}) over ${stacks}   ${one.differing.join(", ")}\n` +
        `    recorded  ${verdictSaid(one.recorded)}\n` +
        `    fresh     ${verdictSaid(one.fresh)}`
      )
    }),
  ]
}

export interface RecordParityJson extends Coverage {
  readonly inventoryPath: string
  readonly rules: number
  readonly agreed: number
  readonly disagreed: number
  readonly rows: readonly RecordParityRow[]
}

export async function temperInventoryRecordParity(
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
    const config = await caps.loadTemperInventoryConfigFromPath(inventoryPath)
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
    const inputs: FreshInputs = {
      orderedRules: config.orderedRules,
      itemRuleById: new Map(config.itemRules.map((one) => [one.itemId, one])),
      queuedById: queuedVerdictsIn(content),
      ctx: {
        env,
        stockGroupByRuleId: caps.computeStockGroups(config.orderedRules, held, factsOf, env),
      },
    }

    const readings: StackReading[] = []
    const itemIds = new Set<number>()
    const comparedItemIds = new Set<number>()
    let recordedStacks = 0
    for (const one of held) {
      itemIds.add(one.item.itemId)
      const recorded = verdictRecordedOn(one.item)
      if (recorded === undefined) continue
      recordedStacks++
      comparedItemIds.add(one.item.itemId)
      readings.push({
        itemId: one.item.itemId,
        itemName: one.item.itemName,
        recorded,
        fresh: freshVerdictFor(one.item, factsOf(one), inputs),
      })
    }

    const rows = rowsFrom(readings)
    const disagreed = new Set(rows.map((one) => one.itemId)).size
    const counted: Coverage = {
      items: itemIds.size,
      stacks: held.length,
      recordedStacks,
      itemsCompared: comparedItemIds.size,
      itemsUncovered: itemIds.size - comparedItemIds.size,
    }
    const out: RecordParityJson = {
      ...counted,
      inventoryPath,
      rules: config.orderedRules.length,
      agreed: counted.itemsCompared - disagreed,
      disagreed,
      rows,
    }
    if (taken.json) return asJson(out)

    const report = [
      `record parity over ${inventoryPath}`,
      `${String(out.rules)} rules, ${String(out.items)} items in ${String(out.stacks)} stacks`,
      ...coverageSaid(counted),
      "",
      ...uncoveredSaid(counted),
      "",
      ...rowsSaid(rows, counted.itemsCompared),
    ]
    if (rows.length === 0) return told(report)
    return answeredWith(
      report,
      [
        `${String(disagreed)} of ${String(counted.itemsCompared)} items carrying a record are ` +
          "decided differently by a fresh reading, and the rows above name them",
      ],
      DATA
    )
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
