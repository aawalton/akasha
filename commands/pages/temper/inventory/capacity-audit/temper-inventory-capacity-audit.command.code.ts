import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { charactersPath as charactersPathArgument } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryCapacityAudit as page } from "akasha/commands/pages/temper/inventory/capacity-audit/temper-inventory-capacity-audit.command.ts"
import {
  capacityFilter,
  planInputs,
  ruleMatcher,
} from "akasha/temper/commands/inventory-plan-capabilities/inventory-plan-capabilities.module.code.ts"
import type { CapacityAudit } from "akasha/temper/items-rules-routing/inventory-management-plan-capacity-filter/inventory-management-plan-capacity-filter.module.code.ts"

const TAKES = [json, inventoryPathArgument, charactersPathArgument]

const SPACES = 2

const AUDIT_HEADER = "[TemperInventory] Capacity audit:"

export function auditSaid(audit: CapacityAudit): readonly string[] {
  if (audit.entries.length === 0) {
    return [AUDIT_HEADER, "  No capacity overflow — every destination fits."]
  }
  const lines: string[] = [AUDIT_HEADER]
  for (const entry of audit.entries) {
    lines.push(
      `  ${entry.destinationName} — needed ${entry.neededSlots} slots, ${entry.freeSlots} free, ` +
        `dropped ${entry.droppedStacks} (${entry.droppedUnits} items)`
    )
    for (const rule of entry.rules) {
      const label = rule.ruleTitle ?? rule.ruleId
      const items = rule.items.map((one) => `${one.itemName} ×${one.units}`).join(", ")
      lines.push(`    ${label} (${rule.action}): ${items}`)
    }
  }
  return lines
}

export async function temperInventoryCapacityAudit(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
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
    const { db, orderedRules, itemRules, context, classifiedItems } =
      await inputs.loadInventoryPlanInputs(inventoryPath, charactersPath)
    const matcher = await ruleMatcher()
    const matched = matcher.computeAllRuleAffectedItems(
      orderedRules,
      classifiedItems,
      context,
      itemRules
    )
    const filter = await capacityFilter()
    const { audit } = filter.applyDestinationCapacityFilterWithAudit(
      orderedRules,
      itemRules,
      matched.ruleMap,
      db
    )
    if (taken.json) return told(JSON.stringify(audit, null, SPACES).split("\n"))
    return told([...auditSaid(audit)])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
