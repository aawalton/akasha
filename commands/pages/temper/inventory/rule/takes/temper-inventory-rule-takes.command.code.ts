import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryRuleTakes as page } from "akasha/commands/pages/temper/inventory/rule/takes/temper-inventory-rule-takes.command.ts"
import {
  planInputs,
  ruleMatcher,
} from "akasha/temper/commands/inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"
import type { AffectedItem } from "akasha/temper/items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"

const TAKES = [categoryRuleId, json, inventoryPathArgument, charactersPathArgument]

const SPACES = 2

const HEADER = "[TemperInventory] Rule takes:"

export interface TakenStack {
  readonly itemId: number
  readonly itemName: string
  readonly units: number
}

export interface ShadowedStack {
  readonly itemId: number
  readonly itemName: string
  readonly units: number
  readonly takenBy: string | null
}

export interface RuleTakes {
  readonly ruleId: string
  readonly categoryId: string
  readonly action: string
  readonly destination: string | null
  readonly taken: readonly TakenStack[]
  readonly shadowed: readonly ShadowedStack[]
}

function unitsOf(one: AffectedItem): number {
  return one.quantity ?? one.item.stackCount
}

export function gatheredByItem(every: readonly AffectedItem[]): ReadonlyMap<number, TakenStack> {
  const out = new Map<number, TakenStack>()
  for (const one of every) {
    const held = out.get(one.item.itemId)
    out.set(one.item.itemId, {
      itemId: one.item.itemId,
      itemName: one.item.itemName,
      units: (held?.units ?? 0) + unitsOf(one),
    })
  }
  return out
}

export function ordered(every: ReadonlyMap<number, TakenStack>): readonly TakenStack[] {
  return [...every.values()].sort(
    (a, b) => b.units - a.units || a.itemName.localeCompare(b.itemName)
  )
}

export function takerOf(
  ruleMap: ReadonlyMap<string, readonly AffectedItem[]>,
  order: readonly string[],
  mine: string,
  itemId: number
): string | null {
  for (const id of order) {
    if (id === mine) continue
    const every = ruleMap.get(id)
    if (every === undefined) continue
    for (const one of every) {
      if (one.item.itemId === itemId) return id
    }
  }
  return null
}

export function takesSaid(takes: RuleTakes): readonly string[] {
  const lines: string[] = [
    HEADER,
    `  \`${takes.ruleId}\` — ${takes.categoryId} / ${takes.action}${
      takes.destination === null ? "" : ` → ${takes.destination}`
    }`,
  ]
  if (takes.taken.length === 0) {
    lines.push("  takes nothing the holdings hold.")
  } else {
    const units = takes.taken.reduce((sum, one) => sum + one.units, 0)
    lines.push(`  takes ${units} item(s) of ${takes.taken.length} kind(s):`)
    for (const one of takes.taken) lines.push(`    ${one.itemName} ×${one.units}`)
  }
  if (takes.shadowed.length > 0) {
    const units = takes.shadowed.reduce((sum, one) => sum + one.units, 0)
    lines.push(`  shadowed — ${units} item(s) it would take alone go to a rule above it:`)
    for (const one of takes.shadowed) {
      lines.push(`    ${one.itemName} ×${one.units} — ${one.takenBy ?? "no rule that ran"}`)
    }
  }
  return lines
}

async function answered(
  taken: {
    readonly categoryRuleId: string
    readonly json: boolean
    readonly inventoryPath?: string
    readonly charactersPath?: string
  },
  root: string
): Promise<Answer> {
  const inputs = await planInputs()
  const inventoryPath =
    taken.inventoryPath === undefined
      ? inputs.DEFAULT_INVENTORY_PATH
      : resolve(root, taken.inventoryPath)
  const charactersPath =
    taken.charactersPath === undefined
      ? inputs.DEFAULT_CHARACTERS_PATH
      : resolve(root, taken.charactersPath)
  const { orderedRules, itemRules, context, classifiedItems } =
    await inputs.loadInventoryPlanInputs(inventoryPath, charactersPath)
  const wanted = orderedRules.find((one) => one.id === taken.categoryRuleId)
  if (wanted === undefined) {
    return refused(`no rule the addon compiled carries the id \`${taken.categoryRuleId}\``, DATA)
  }
  const matcher = await ruleMatcher()
  const whole = matcher.computeAllRuleAffectedItems(
    orderedRules,
    classifiedItems,
    context,
    itemRules
  )
  const alone = matcher.computeAllRuleAffectedItems([wanted], classifiedItems, context)
  const mine = gatheredByItem(whole.ruleMap.get(taken.categoryRuleId) ?? [])
  const solo = gatheredByItem(alone.ruleMap.get(taken.categoryRuleId) ?? [])
  const order = orderedRules.map((one, at) => one.id ?? `rule#${String(at)}`)
  const above = order.slice(0, order.indexOf(taken.categoryRuleId))
  const shadowed: ShadowedStack[] = []
  for (const [itemId, stack] of solo) {
    const lost = stack.units - (mine.get(itemId)?.units ?? 0)
    if (lost <= 0) continue
    shadowed.push({
      itemId,
      itemName: stack.itemName,
      units: lost,
      takenBy: takerOf(whole.ruleMap, above, taken.categoryRuleId, itemId),
    })
  }
  const takes: RuleTakes = {
    ruleId: taken.categoryRuleId,
    categoryId: wanted.categoryId,
    action: wanted.action,
    destination: wanted.destination ?? null,
    taken: ordered(mine),
    shadowed: shadowed.sort((a, b) => b.units - a.units || a.itemName.localeCompare(b.itemName)),
  }
  if (taken.json) return told(JSON.stringify(takes, null, SPACES).split("\n"))
  return told([...takesSaid(takes)])
}

export async function temperInventoryRuleTakes(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return await answered(read.taken, resolve(given.root))
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
