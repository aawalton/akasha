import { itemRuleId } from "akasha/command/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleLock as page } from "akasha/command/pages/temper/inventory/item-rule/lock/temper-inventory-item-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    lockingRule("item", taken.itemRuleId, true, done)
  )
}
