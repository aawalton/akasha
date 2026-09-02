import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const transmutedNothing = {
  id: "01a05fd0-4de7-7b3f-bf82-e1dbcc49a50e",
  pageTypeSlug: "temper-rule-template",
  slug: "transmuted-nothing",
  title: "Protect transmuted gear",
  key: "transmuted-nothing",
  description:
    "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
  categoryId: "equipment",
  displayOrder: 9,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
