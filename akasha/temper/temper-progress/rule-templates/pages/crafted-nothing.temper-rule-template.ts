import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const craftedNothing = {
  id: "01a05fd0-4dde-7b4a-8808-f21e0517e0cb",
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
