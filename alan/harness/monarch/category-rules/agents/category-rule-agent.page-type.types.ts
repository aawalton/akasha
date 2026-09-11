import type { Judgement } from "akasha/alan/harness/monarch/category-rules/agents/properties/judgement.text-property.types.ts"
import type { CategoryRule } from "akasha/alan/harness/monarch/category-rules/category-rule.page-type.types.ts"

export type CategoryRuleAgent = CategoryRule & {
  judgement: Judgement
}
