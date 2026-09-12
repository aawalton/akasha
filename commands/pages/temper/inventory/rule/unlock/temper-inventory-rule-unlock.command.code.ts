import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/eso-answering/eso-answering.module.code.ts"
import { temperInventoryRuleUnlock as page } from "akasha/commands/pages/temper/inventory/rule/unlock/temper-inventory-rule-unlock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [categoryRuleId], (taken, done) =>
    lockingRule("category", taken.categoryRuleId, false, done)
  )
}
