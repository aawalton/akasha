import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"
import { temperInventoryRuleLock as page } from "akasha/commands/pages/temper/inventory/rule/lock/temper-inventory-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [categoryRuleId], (taken, done) =>
    lockingRule("category", taken.categoryRuleId, true, done)
  )
}
