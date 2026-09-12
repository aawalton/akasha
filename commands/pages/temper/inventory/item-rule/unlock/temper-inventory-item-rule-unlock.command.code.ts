import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleUnlock as page } from "akasha/commands/pages/temper/inventory/item-rule/unlock/temper-inventory-item-rule-unlock.command.ts"
import { lockingRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    lockingRule("item", taken.itemRuleId, false, done)
  )
}
