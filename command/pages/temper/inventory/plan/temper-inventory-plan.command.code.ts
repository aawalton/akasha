import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/command/argument/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { json as jsonArgument } from "akasha/command/argument/pages/json.argument.ts"
import { loginChecklist as loginChecklistArgument } from "akasha/command/argument/pages/login-checklist.argument.ts"
import { unmapped as unmappedArgument } from "akasha/command/argument/pages/unmapped.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventoryPlan as page } from "akasha/command/pages/temper/inventory/plan/temper-inventory-plan.command.ts"
import {
  gatheredByItem,
  ordered,
  type TakenStack,
} from "akasha/command/pages/temper/inventory/rule/takes/temper-inventory-rule-takes.command.code.ts"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  capacityFilter,
  classifyItem,
  inventoryParser,
  managementPlan,
  parseCharacters,
  parseConfig,
  planChecklist,
  planInputs,
  ruleMatcher,
  ruleOutcomes,
} from "akasha/temper/command/modules/inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { ClassifiableItem } from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import {
  type CompiledOrderedRule,
  IMPLICIT_TERMINAL_COMPILED_RULE,
} from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type {
  AffectedItem,
  ClassifiedInventoryItem,
} from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { ALL_CATEGORIES_ID } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  IndeterminateReason,
  WalkOutcome,
} from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"
import type {
  CharacterSession,
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

const NAMED = [
  jsonArgument,
  inventoryPathArgument,
  charactersPathArgument,
  loginChecklistArgument,
  unmappedArgument,
]

const INVENTORY_LUA = "TemperItems.lua"

const SPACES = 2

const PLAN_HEADER = "[TemperItems] Plan:"

const UNMAPPED_HEADER = "[TemperItems] Unmapped:"

function verbOf(action: string, destination: string | undefined): string {
  switch (action) {
    case "sell":
    case "destroy":
    case "fence-sell":
      return "sell"
    case "fence-launder":
      return "launder"
    case "list":
      return "list"
    case "mail":
      return "mail"
    case "deconstruct":
      return "deconstruct"
    case "refine":
      return "refine"
    case "research":
      return "research"
    case "character-equip":
    case "companion-equip":
      return "equip"
    case "stock":
      return "stock"
    case "move-to":
      return destination?.startsWith("character:") === true ? "withdraw" : "deposit"
    case "use":
      return "use"
    case "open":
      return "open"
    case "nothing":
    case "lock":
    case "unlock":
      return action
    default:
      return assertNever(action as never)
  }
}

function venueRows(plan: ManagementPlan): ReadonlyMap<string, Map<string, number>> {
  const labelToVerbs = new Map<string, Map<string, number>>()
  const holdItem = (item: PlanItem, verbs: Map<string, number>): undefined => {
    const verb = verbOf(item.action, undefined)
    verbs.set(verb, (verbs.get(verb) ?? 0) + item.stackCount)
    return undefined
  }
  const holdVenue = (venue: VenueStop): undefined => {
    let verbs = labelToVerbs.get(venue.label)
    if (verbs === undefined) {
      verbs = new Map()
      labelToVerbs.set(venue.label, verbs)
    }
    for (const group of venue.actionGroups) for (const item of group.items) holdItem(item, verbs)
    return undefined
  }
  const holdSession = (session: CharacterSession): undefined => {
    for (const venue of session.venues) holdVenue(venue)
    return undefined
  }
  for (const session of plan.sessions) holdSession(session)
  return labelToVerbs
}

export function planSaid(plan: ManagementPlan): readonly string[] {
  const rows = venueRows(plan)
  if (rows.size === 0) return [PLAN_HEADER, "  (no actions pending)"]
  const lines: string[] = [PLAN_HEADER]
  for (const [label, verbs] of rows) {
    const parts: string[] = []
    for (const [verb, count] of verbs) parts.push(`${verb} ${count}`)
    if (parts.length === 0) continue
    lines.push(`  ${label} — ${parts.join(", ")}`)
  }
  return lines
}

export interface UndecidedStack {
  readonly itemId: number
  readonly itemName: string
  readonly units: number
  readonly missingSignals: readonly string[]
}

export interface UnmappedReport {
  readonly unreached: readonly TakenStack[]
  readonly undecided: readonly UndecidedStack[]
}

export interface OutcomeForItem {
  readonly itemId: number
  readonly itemName: string
  readonly units: number
  readonly outcome: WalkOutcome
}

function missingSignalOf(reason: IndeterminateReason): string {
  switch (reason.kind) {
    case "category-unknown":
    case "condition-unknown":
      return reason.missingSignal
    case "condition-misshapen":
      return `${reason.conditionKind} is misshapen`
    case "destination-unknown":
      return reason.detail ?? "the destination"
    default:
      return assertNever(reason)
  }
}

export function undecidedByItem(every: readonly OutcomeForItem[]): readonly UndecidedStack[] {
  const gathered = new Map<number, { itemName: string; units: number; signals: Set<string> }>()
  for (const one of every) {
    if (one.outcome.kind !== "indeterminate") continue
    let held = gathered.get(one.itemId)
    if (held === undefined) {
      held = { itemName: one.itemName, units: 0, signals: new Set<string>() }
      gathered.set(one.itemId, held)
    }
    held.units += one.units
    for (const rule of one.outcome.indeterminateRules) {
      if (rule.verdict.kind !== "indeterminate") continue
      held.signals.add(missingSignalOf(rule.verdict.reason))
    }
  }
  return [...gathered]
    .map(([itemId, held]) => ({
      itemId,
      itemName: held.itemName,
      units: held.units,
      missingSignals: [...held.signals].sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => b.units - a.units || a.itemName.localeCompare(b.itemName))
}

function unreachedSaid(stacks: readonly TakenStack[]): readonly string[] {
  if (stacks.length === 0) return ["  every item the holdings hold is reached by a rule."]
  const units = stacks.reduce((sum, one) => sum + one.units, 0)
  return [
    `  no rule reaches ${units} item(s) of ${stacks.length} kind(s):`,
    ...stacks.map((one) => `    ${one.itemName} ×${one.units}`),
  ]
}

function undecidedSaid(stacks: readonly UndecidedStack[]): readonly string[] {
  if (stacks.length === 0) return ["  no item a rule reaches is left undecided."]
  const units = stacks.reduce((sum, one) => sum + one.units, 0)
  return [
    `  a rule could not decide ${units} item(s) of ${stacks.length} kind(s):`,
    ...stacks.map((one) => `    ${one.itemName} ×${one.units} — ${one.missingSignals.join(", ")}`),
  ]
}

export function unmappedSaid(report: UnmappedReport): readonly string[] {
  return [UNMAPPED_HEADER, ...unreachedSaid(report.unreached), ...undecidedSaid(report.undecided)]
}

const NO_CONDITION_KEYS = new Set(["id", "action", "destination", "categoryId", "active"])

function endsTheRules(rule: CompiledOrderedRule): boolean {
  if (rule.action !== "nothing") return false
  if (rule.categoryId !== ALL_CATEGORIES_ID) return false
  return Object.entries(rule).every(
    ([key, held]) => held === undefined || NO_CONDITION_KEYS.has(key)
  )
}

export function endingRuleIds(rules: readonly CompiledOrderedRule[]): readonly string[] {
  const ids: string[] = []
  for (let at = rules.length - 1; at >= 0; at -= 1) {
    const rule = rules[at]
    if (rule === undefined || !endsTheRules(rule)) break
    if (rule.active !== false) ids.push(rule.id ?? `rule#${at}`)
  }
  return ids
}

export function unmappedItems(
  ruleMap: ReadonlyMap<string, readonly AffectedItem[]>,
  rules: readonly CompiledOrderedRule[]
): readonly AffectedItem[] {
  const held: AffectedItem[] = []
  for (const id of endingRuleIds(rules)) held.push(...(ruleMap.get(id) ?? []))
  return held
}

function classifiedFor(
  db: InventoryDatabase,
  toNodeIds: (item: ClassifiableItem) => readonly string[]
): readonly ClassifiedInventoryItem[] {
  const out: ClassifiedInventoryItem[] = []
  for (const [locationKey, location] of Object.entries(db.locations)) {
    for (const [bagIdSaid, slots] of Object.entries(location.bags)) {
      for (const item of Object.values(slots)) {
        out.push({
          item,
          locationKey,
          locationDisplayName: location.displayName,
          nodeIds: toNodeIds(item),
          bagId: Number(bagIdSaid),
        })
      }
    }
  }
  return out
}

export async function temperInventoryPlan(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const root = resolve(given.root)
  try {
    const inputs = await planInputs()
    const inventoryPath =
      taken.inventoryPath === undefined
        ? inputs.DEFAULT_INVENTORY_PATH
        : resolve(root, taken.inventoryPath)
    const charactersPath =
      taken.charactersPath === undefined
        ? inputs.DEFAULT_CHARACTERS_PATH
        : resolve(root, taken.charactersPath)
    let content: string
    try {
      content = await readFile(inventoryPath, "utf8")
    } catch (thrown) {
      return refused(`${INVENTORY_LUA} at ${inventoryPath} would not open — ${whyOf(thrown)}`, DATA)
    }
    const [parser, configModule, charactersModule, classifier] = await Promise.all([
      inventoryParser(),
      parseConfig(),
      parseCharacters(),
      classifyItem(),
    ])
    const db = parser.parseInventoryContent(content)
    const config = configModule.parseTemperItemsConfig(content)
    const characters = await charactersModule.loadTemperCharactersFromPath(charactersPath)
    const charactersById = new Map<string, CharacterKnowledge>(
      characters.map((one) => [one.id, one])
    )
    const context = inputs.buildMatcherContext(config, charactersById, db)
    const classifiedItems = classifiedFor(db, classifier.classifyItemToNodeIds)
    const orderedRules: readonly CompiledOrderedRule[] = config.orderedRules.map((rule, at) => ({
      ...rule,
      id: config.rules[at]?.id ?? `rule#${at}`,
    }))
    const itemRules = config.itemRules
    const [matcher, filter, builder] = await Promise.all([
      ruleMatcher(),
      capacityFilter(),
      managementPlan(),
    ])
    const matched = matcher.computeAllRuleAffectedItems(
      orderedRules,
      classifiedItems,
      context,
      itemRules
    )
    if (taken.unmapped) {
      const ending = [...orderedRules, IMPLICIT_TERMINAL_COMPILED_RULE]
      const outcomes = (await ruleOutcomes()).itemOutcomes(orderedRules, classifiedItems, context)
      const report: UnmappedReport = {
        unreached: ordered(gatheredByItem(unmappedItems(matched.ruleMap, ending))),
        undecided: undecidedByItem(
          outcomes.map((one) => ({
            itemId: one.item.item.itemId,
            itemName: one.item.item.itemName,
            units: one.item.item.stackCount,
            outcome: one.outcome,
          }))
        ),
      }
      if (taken.json) return told(JSON.stringify(report, null, SPACES).split("\n"))
      return told(unmappedSaid(report))
    }
    const filtered = filter.applyDestinationCapacityFilter(
      orderedRules,
      itemRules,
      matched.ruleMap,
      db
    )
    const plan = builder.buildManagementPlan(orderedRules, itemRules, filtered, db, context)
    if (taken.json) {
      return told(JSON.stringify(plan, null, SPACES).split("\n"))
    }
    if (taken.loginChecklist) {
      const said = (await planChecklist()).formatPlanChecklist(plan)
      return told(said.replace(/\n+$/, "").split("\n"))
    }
    return told(planSaid(plan))
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
