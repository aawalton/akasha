import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { tsv } from "akasha/commands/arguments/pages/tsv.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleShow as page } from "akasha/commands/pages/temper/inventory/rule/show/temper-inventory-rule-show.command.ts"
import {
  answeredByPage,
  shownRule,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleShow(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [tsv, categoryRuleId, json], (taken) =>
    shownRule("category", taken.categoryRuleId, taken.tsv)
  )
}
