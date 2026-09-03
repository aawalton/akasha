import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const poisonsNormalSell = {
  id: "019e3104-262b-7172-acfb-0833ef728080",
  pageTypeSlug: "temper-rule-template",
  slug: "poisons-normal-sell",
  title: "Sell basic poisons",
  key: "poisons-normal-sell",
  description:
    "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
  categoryId: "poisons",
  displayOrder: 43,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
