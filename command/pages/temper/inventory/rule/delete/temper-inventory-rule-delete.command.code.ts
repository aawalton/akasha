import { categoryRuleId } from "akasha/command/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/command/arguments/pages/force.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleDelete as page } from "akasha/command/pages/temper/inventory/rule/delete/temper-inventory-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [force, categoryRuleId], (taken, done) =>
    droppingRule("category", taken.categoryRuleId, taken.force, done)
  )
}
