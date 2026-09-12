import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleDuplicate as page } from "akasha/commands/pages/temper/inventory/rule/duplicate/temper-inventory-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [categoryRuleId], (taken, done) =>
    copyingRule("category", taken.categoryRuleId, done)
  )
}
