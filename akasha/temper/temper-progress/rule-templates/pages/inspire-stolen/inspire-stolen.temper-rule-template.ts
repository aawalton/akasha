import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const inspireStolen = {
  id: "019e3104-2614-7316-8d1c-1e373007d0dc",
  pageTypeSlug: "temper-rule-template",
  slug: "inspire-stolen",
  title: "Launder stolen inspiration",
  key: "inspire-stolen",
  description:
    "Launders stolen equipment that would give useful crafting inspiration, so it can be deconstructed. Place before other inspiration rules.",
  categoryId: "equipment",
  displayOrder: 16,
  action: "fence-launder",
  active: false,
  goal: "progress",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
