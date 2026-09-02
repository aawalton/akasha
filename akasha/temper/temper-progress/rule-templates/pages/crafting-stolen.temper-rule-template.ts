import type { TemperRuleTemplate } from "../temper-rule-template.page-type.ts"

export const craftingStolen = {
  id: "01a05fd0-4ddf-77d3-81cd-bdddd7a07d0c",
  pageTypeSlug: "temper-rule-template",
  slug: "crafting-stolen",
  title: "Launder crafting materials",
  key: "crafting-stolen",
  description: "Launders stolen crafting materials so they can be deposited or used.",
  categoryId: "crafting",
  displayOrder: 28,
  action: "fence-launder",
  active: false,
  goal: "hoard",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
