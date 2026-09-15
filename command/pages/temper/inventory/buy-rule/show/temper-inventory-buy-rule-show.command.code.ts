import { buyRuleId } from "akasha/command/argument/pages/buy-rule-id.argument.ts"
import { tsv } from "akasha/command/argument/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleShow as page } from "akasha/command/pages/temper/inventory/buy-rule/show/temper-inventory-buy-rule-show.command.ts"
import { shownRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, buyRuleId], (taken) =>
    shownRule("buy", taken.buyRuleId, taken.tsv)
  )
}
