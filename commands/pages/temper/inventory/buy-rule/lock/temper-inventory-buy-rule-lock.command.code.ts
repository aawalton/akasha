import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleLock as page } from "akasha/commands/pages/temper/inventory/buy-rule/lock/temper-inventory-buy-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [buyRuleId], (taken, done) =>
    lockingRule("buy", taken.buyRuleId, true, done)
  )
}
