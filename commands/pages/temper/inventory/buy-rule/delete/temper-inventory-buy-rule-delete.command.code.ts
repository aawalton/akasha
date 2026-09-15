import { buyRuleId } from "akasha/command/arguments/pages/buy-rule-id.argument.ts"
import { force } from "akasha/command/arguments/pages/force.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleDelete as page } from "akasha/command/pages/temper/inventory/buy-rule/delete/temper-inventory-buy-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [force, buyRuleId], (taken, done) =>
    droppingRule("buy", taken.buyRuleId, taken.force, done)
  )
}
