import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const craftedNothing = {
  id: "019e3104-260b-72d1-adc2-e89106a13e08",
  pageTypeSlug: "temper-rule-template",
  slug: "crafted-nothing",
  title: "Protect crafted gear",
  key: "crafted-nothing",
  description:
    "Prevents crafted equipment from being affected by lower-priority rules. Useful for keeping gear you've invested materials into.",
  categoryId: "equipment",
  displayOrder: 6,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
