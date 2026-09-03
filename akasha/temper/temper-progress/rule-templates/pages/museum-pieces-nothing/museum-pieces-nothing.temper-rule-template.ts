import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const museumPiecesNothing = {
  id: "019e3104-261a-78c9-ad6d-5f414754c1c5",
  pageTypeSlug: "temper-rule-template",
  slug: "museum-pieces-nothing",
  title: "Protect museum pieces",
  key: "museum-pieces-nothing",
  description:
    "Prevents museum pieces from being affected by lower-priority rules. These are turn-in items for collections or achievements.",
  categoryId: "museum-pieces",
  displayOrder: 24,
  action: "nothing",
  active: false,
  goal: "task",
} as const satisfies TemperRuleTemplate
