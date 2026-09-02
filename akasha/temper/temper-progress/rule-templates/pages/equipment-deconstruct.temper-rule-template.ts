import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const equipmentDeconstruct = {
  id: "01a05fd0-4ddf-7189-8f92-d75be8f796fe",
  pageTypeSlug: "temper-rule-template",
  slug: "equipment-deconstruct",
  title: "Deconstruct leftover equipment",
  key: "equipment-deconstruct",
  description:
    "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
  categoryId: "equipment",
  displayOrder: 26,
  action: "deconstruct",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
