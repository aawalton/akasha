import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const reconstructedNothing = {
  id: "01a05fd0-4de5-7bb0-ac1c-dc31295d8175",
  pageTypeSlug: "temper-rule-template",
  slug: "reconstructed-nothing",
  title: "Protect reconstructed gear",
  key: "reconstructed-nothing",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  categoryId: "equipment",
  displayOrder: 8,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
