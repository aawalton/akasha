import type { Judgement } from "akasha/alan/harness/monarch/category-rule/agent/properties/judgement.text-property.types.ts"
import type { CategoryRule } from "akasha/alan/harness/monarch/category-rule/category-rule.page-type.types.ts"

export type CategoryRuleAgent = CategoryRule & {
  judgement: Judgement
}
