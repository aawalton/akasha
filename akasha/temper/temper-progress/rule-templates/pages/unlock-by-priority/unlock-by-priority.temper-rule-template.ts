import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const unlockByPriority = {
  id: "019e3104-2610-72db-8869-9f0539544306",
  pageTypeSlug: "temper-rule-template",
  slug: "unlock-by-priority",
  title: "Use unlockables",
  key: "unlock-by-priority",
  description:
    "Uses items that teach something new — motifs, recipes, style pages, furnishing plans, etc. If the current character can learn the item, it's used immediately. For recipes (character-specific knowledge), the addon checks the current character only (ESO API limitation).",
  categoryId: "knowledge",
  displayOrder: 11,
  action: "use",
  active: false,
  goal: "unlock",
  destination: "character:by-priority",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
