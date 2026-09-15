import { itemRuleId } from "akasha/command/arguments/pages/item-rule-id.argument.ts"
import { tsv } from "akasha/command/arguments/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleShow as page } from "akasha/command/pages/temper/inventory/item-rule/show/temper-inventory-item-rule-show.command.ts"
import { shownRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, itemRuleId], (taken) =>
    shownRule("item", taken.itemRuleId, taken.tsv)
  )
}
