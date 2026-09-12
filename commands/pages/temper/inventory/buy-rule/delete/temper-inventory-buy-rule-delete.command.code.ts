import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleDelete as page } from "akasha/commands/pages/temper/inventory/buy-rule/delete/temper-inventory-buy-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [force, buyRuleId], (taken, done) =>
    droppingRule("buy", taken.buyRuleId, taken.force, done)
  )
}
