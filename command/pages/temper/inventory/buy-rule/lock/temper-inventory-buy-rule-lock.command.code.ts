import { buyRuleId } from "akasha/command/argument/pages/buy-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleLock as page } from "akasha/command/pages/temper/inventory/buy-rule/lock/temper-inventory-buy-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [buyRuleId], (taken, done) =>
    lockingRule("buy", taken.buyRuleId, true, done)
  )
}
