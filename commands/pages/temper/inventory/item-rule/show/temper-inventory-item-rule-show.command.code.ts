import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import { tsv } from "akasha/commands/arguments/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleShow as page } from "akasha/commands/pages/temper/inventory/item-rule/show/temper-inventory-item-rule-show.command.ts"
import { shownRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, itemRuleId], (taken) =>
    shownRule("item", taken.itemRuleId, taken.tsv)
  )
}
