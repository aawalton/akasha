import { categoryRuleId } from "akasha/command/arguments/pages/category-rule-id.argument.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import { tsv } from "akasha/command/arguments/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleShow as page } from "akasha/command/pages/temper/inventory/rule/show/temper-inventory-rule-show.command.ts"
import { shownRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, categoryRuleId, json], (taken) =>
    shownRule("category", taken.categoryRuleId, taken.tsv)
  )
}
