import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleDuplicate as page } from "akasha/commands/pages/temper/inventory/buy-rule/duplicate/temper-inventory-buy-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [buyRuleId], (taken, done) =>
    copyingRule("buy", taken.buyRuleId, done)
  )
}
