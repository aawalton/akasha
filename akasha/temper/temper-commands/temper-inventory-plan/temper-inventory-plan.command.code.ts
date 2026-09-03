import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { ClassifiableItem } from "@akasha/temper-items-core/item-category-tree-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  type CharacterKnowledge,
  type CharacterSession,
  type ClassifiedInventoryItem,
  type CompiledOrderedRule,
  capacityFilter,
  classifyItem,
  inventoryParser,
  type ManagementPlan,
  managementPlan,
  type PlanItem,
  parseCharacters,
  parseConfig,
  planChecklist,
  planInputs,
  ruleMatcher,
  type VenueStop,
} from "../inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const CHARACTERS_PATH = "--characters-path"

const JSON_FLAG = "--json"

const CHECKLIST = "--checklist"

const INVENTORY_LUA = "TemperInventory.lua"

const SPACES = 2

const PLAN_HEADER = "[TemperInventory] Plan:"

export type Read =
  | {
      readonly inventoryPath: string | null
      readonly charactersPath: string | null
      readonly json: boolean
      readonly checklist: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let charactersPath: string | null = null
  let json = false
  let checklist = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === CHECKLIST) {
      checklist = true
      continue
    }
    if (one === INVENTORY_PATH || one === CHARACTERS_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      if (one === INVENTORY_PATH) inventoryPath = value
      else charactersPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\`, ` +
        `\`${CHARACTERS_PATH}\`, \`${JSON_FLAG}\` and \`${CHECKLIST}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, charactersPath, json, checklist }
}

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

export async function temperInventoryPlan(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  try {
    const inputs = await planInputs()
    const inventoryPath =
      read.inventoryPath === null
        ? inputs.DEFAULT_INVENTORY_PATH
        : resolve(root, read.inventoryPath)
    const charactersPath =
      read.charactersPath === null
        ? inputs.DEFAULT_CHARACTERS_PATH
        : resolve(root, read.charactersPath)
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
    const filtered = filter.applyDestinationCapacityFilter(
      orderedRules,
      itemRules,
      matched.ruleMap,
      db
    )
    const plan = builder.buildManagementPlan(orderedRules, itemRules, filtered, db, context)
    if (read.json) {
      return { report: JSON.stringify(plan, null, SPACES).split("\n"), refusals: [], code: 0 }
    }
    if (read.checklist) {
      const said = (await planChecklist()).formatPlanChecklist(plan)
      return { report: said.replace(/\n+$/, "").split("\n"), refusals: [], code: 0 }
    }
    return { report: [...planSaid(plan)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
