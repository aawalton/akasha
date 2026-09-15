import { itemRuleId } from "akasha/command/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleUnlock as page } from "akasha/command/pages/temper/inventory/item-rule/unlock/temper-inventory-item-rule-unlock.command.ts"
import { lockingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    lockingRule("item", taken.itemRuleId, false, done)
  )
}
