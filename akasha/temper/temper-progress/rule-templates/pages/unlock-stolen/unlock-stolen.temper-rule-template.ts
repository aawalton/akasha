import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const unlockStolen = {
  id: "01a05fd0-4de9-7eee-9827-d67324c073b5",
  pageTypeSlug: "temper-rule-template",
  slug: "unlock-stolen",
  title: "Launder stolen unlockables",
  key: "unlock-stolen",
  description:
    "Launders stolen items that can teach something (motifs, recipes, etc.) so they can be used. Place before other unlock rules.",
  categoryId: "knowledge",
  displayOrder: 10,
  action: "fence-launder",
  active: false,
  goal: "unlock",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
