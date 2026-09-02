import { isControlledRuleId } from "../inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

type RuleCardType = "character" | "companion" | "category"

export function classifyRule(rule: CategoryRule): RuleCardType {
  if (isControlledRuleId(rule.id)) {
    if (rule.id.startsWith("controlled:character:")) return "character"
    if (rule.id.startsWith("controlled:companion:")) return "companion"
  }
  if (
    rule.action === "companion-equip" ||
    rule.conditions?.isTargetCompanionEquip === "is-target-companion-equip"
  ) {
    return "companion"
  }
  if (
    rule.action === "character-equip" ||
    rule.conditions?.isTargetEquip === "is-target-equip" ||
    (rule.action === "stock" &&
      (rule.categoryId === "food" ||
        rule.categoryId === "potions" ||
        rule.categoryId === "drink") &&
      rule.conditions?.allStocked !== undefined)
  ) {
    return "character"
  }
  return "category"
}
