import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const legendaryNothing = {
  id: "01a05fd0-4de2-7642-b914-d73902dd2b02",
  pageTypeSlug: "temper-rule-template",
  slug: "legendary-nothing",
  title: "Protect legendary gear",
  key: "legendary-nothing",
  description:
    "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
  categoryId: "equipment",
  displayOrder: 5,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
