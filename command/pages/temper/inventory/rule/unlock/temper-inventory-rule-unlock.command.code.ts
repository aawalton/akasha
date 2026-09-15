import { categoryRuleId } from "akasha/command/arguments/pages/category-rule-id.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleUnlock as page } from "akasha/command/pages/temper/inventory/rule/unlock/temper-inventory-rule-unlock.command.ts"
import { lockingRule } from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [categoryRuleId], (taken, done) =>
    lockingRule("category", taken.categoryRuleId, false, done)
  )
}
