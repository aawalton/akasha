import type { CategoryRule } from "../category-rule.page-type.ts"
import type { Judgement } from "./properties/judgement.text-property.ts"

export type CategoryRuleAgent = CategoryRule & {
  judgement: Judgement
}
