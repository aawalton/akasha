import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"
import { temperInventoryItemRuleLock as page } from "akasha/commands/pages/temper/inventory/item-rule/lock/temper-inventory-item-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [itemRuleId], (taken, done) =>
    lockingRule("item", taken.itemRuleId, true, done)
  )
}
