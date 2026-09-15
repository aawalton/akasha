import { categoryRuleId } from "akasha/command/arguments/pages/category-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleDuplicate as page } from "akasha/command/pages/temper/inventory/rule/duplicate/temper-inventory-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [categoryRuleId], (taken, done) =>
    copyingRule("category", taken.categoryRuleId, done)
  )
}
