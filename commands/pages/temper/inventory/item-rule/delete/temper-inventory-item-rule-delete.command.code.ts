import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleDelete as page } from "akasha/commands/pages/temper/inventory/item-rule/delete/temper-inventory-item-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [force, itemRuleId], (taken, done) =>
    droppingRule("item", taken.itemRuleId, taken.force, done)
  )
}
