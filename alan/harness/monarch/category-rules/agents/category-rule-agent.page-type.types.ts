import type { CategoryRule } from "../category-rule.page-type.types.ts"
import type { Judgement } from "./properties/judgement.text-property.ts"

export type CategoryRuleAgent = CategoryRule & {
  judgement: Judgement
}
