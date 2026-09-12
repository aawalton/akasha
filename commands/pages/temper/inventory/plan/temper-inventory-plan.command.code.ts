import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import { loginChecklist as loginChecklistArgument } from "akasha/commands/arguments/pages/login-checklist.argument.ts"
import { unmapped as unmappedArgument } from "akasha/commands/arguments/pages/unmapped.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryPlan as page } from "akasha/commands/pages/temper/inventory/plan/temper-inventory-plan.command.ts"
import {
  gatheredByItem,
  ordered,
  type TakenStack,
} from "akasha/commands/pages/temper/inventory/rule/takes/temper-inventory-rule-takes.command.code.ts"
import type { CharacterKnowledge } from "akasha/temper/commands/inventory-characters-reading/inventory-characters-reading.module.code.ts"
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
} from "akasha/temper/commands/inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import type { ClassifiableItem } from "akasha/temper/items-core/item-category-tree-types/item-category-tree-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ClassifiedInventoryItem } from "akasha/temper/items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { IMPLICIT_TERMINAL_RULE_ID } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  CharacterSession,
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "akasha/temper/items-rules-routing-core/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"

const NAMED = [
  jsonArgument,
  inventoryPathArgument,
  charactersPathArgument,
  loginChecklistArgument,
  unmappedArgument,
]

const INVENTORY_LUA = "TemperInventory.lua"

const SPACES = 2

const PLAN_HEADER = "[TemperInventory] Plan:"

const UNMAPPED_HEADER = "[TemperInventory] Unmapped:"

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

export function unmappedSaid(stacks: readonly TakenStack[]): readonly string[] {
  if (stacks.length === 0) {
    return [UNMAPPED_HEADER, "  every item the holdings hold is reached by a rule."]
  }
  const units = stacks.reduce((sum, one) => sum + one.units, 0)
  const lines: string[] = [
    UNMAPPED_HEADER,
    `  no rule reaches ${units} item(s) of ${stacks.length} kind(s):`,
  ]
  for (const one of stacks) lines.push(`    ${one.itemName} ×${one.units}`)
  return lines
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
    const config = configModule.parseTemperInventoryConfig(content)
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
    const itemRules = [] as const
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
      const stacks = ordered(gatheredByItem(matched.ruleMap.get(IMPLICIT_TERMINAL_RULE_ID) ?? []))
      if (taken.json) return told(JSON.stringify(stacks, null, SPACES).split("\n"))
      return told(unmappedSaid(stacks))
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
