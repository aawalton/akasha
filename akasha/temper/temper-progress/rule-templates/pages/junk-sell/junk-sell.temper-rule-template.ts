import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const junkSell = {
  id: "019e3104-2625-71f1-b471-1e111e52165c",
  pageTypeSlug: "temper-rule-template",
  slug: "junk-sell",
  title: "Sell junk",
  key: "junk-sell",
  description: "Sells items in the junk category at a merchant.",
  categoryId: "junk",
  displayOrder: 37,
  action: "sell",
  active: false,
  goal: "sell",
} as const satisfies TemperRuleTemplate
