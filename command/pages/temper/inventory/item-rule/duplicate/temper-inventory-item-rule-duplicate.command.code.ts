import { itemRuleId } from "akasha/command/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleDuplicate as page } from "akasha/command/pages/temper/inventory/item-rule/duplicate/temper-inventory-item-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    copyingRule("item", taken.itemRuleId, done)
  )
}
