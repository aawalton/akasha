import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const inspireStolen = {
  id: "01a05fd0-4de1-7831-99ed-cddcabb85672",
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
