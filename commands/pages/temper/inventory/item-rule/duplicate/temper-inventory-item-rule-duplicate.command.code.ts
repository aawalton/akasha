import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleDuplicate as page } from "akasha/commands/pages/temper/inventory/item-rule/duplicate/temper-inventory-item-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    copyingRule("item", taken.itemRuleId, done)
  )
}
