import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleDelete as page } from "akasha/commands/pages/temper/inventory/rule/delete/temper-inventory-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [force, categoryRuleId], (taken, done) =>
    droppingRule("category", taken.categoryRuleId, taken.force, done)
  )
}
