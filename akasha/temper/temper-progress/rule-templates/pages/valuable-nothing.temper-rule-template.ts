import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const valuableNothing = {
  id: "01a05fd0-4de9-7ffb-b5c9-a63c5606c761",
  pageTypeSlug: "temper-rule-template",
  slug: "valuable-nothing",
  title: "Protect valuable items",
  key: "valuable-nothing",
  description:
    "Prevents items with a guild store value of 10,000g or more from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard items worth trading.",
  categoryId: "all",
  displayOrder: 12,
  action: "nothing",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
