import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const researchStolen = {
  id: "01a05fd0-4de5-7981-884f-f9582a277437",
  pageTypeSlug: "temper-rule-template",
  slug: "research-stolen",
  title: "Launder stolen researchables",
  key: "research-stolen",
  description:
    "Launders stolen equipment with a researchable trait so it can be submitted at a crafting station. Place before other research rules.",
  categoryId: "equipment",
  displayOrder: 13,
  action: "fence-launder",
  active: false,
  goal: "unlock",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
