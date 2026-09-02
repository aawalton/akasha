import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const goldStock = {
  id: "01a05fd0-4de0-7543-a739-4a1cc29271f7",
  pageTypeSlug: "temper-rule-template",
  slug: "gold-stock",
  title: "Stock gold",
  key: "gold-stock",
  description:
    "Keeps up to 1,000,000 gold on each character. Excess is deposited into the bank when visiting.",
  categoryId: "currency-gold",
  displayOrder: 0,
  action: "stock",
  active: false,
  goal: "use",
  stockScope: "any-character",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
