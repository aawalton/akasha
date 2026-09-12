import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { tsv } from "akasha/commands/arguments/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleShow as page } from "akasha/commands/pages/temper/inventory/buy-rule/show/temper-inventory-buy-rule-show.command.ts"
import { shownRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, buyRuleId], (taken) =>
    shownRule("buy", taken.buyRuleId, taken.tsv)
  )
}
