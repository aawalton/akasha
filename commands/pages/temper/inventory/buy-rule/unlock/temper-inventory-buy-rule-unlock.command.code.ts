import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleUnlock as page } from "akasha/commands/pages/temper/inventory/buy-rule/unlock/temper-inventory-buy-rule-unlock.command.ts"
import {
  answeredByPage,
  lockingRule,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [buyRuleId], (taken, done) =>
    lockingRule("buy", taken.buyRuleId, false, done)
  )
}
