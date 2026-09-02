import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const otherCurrencyBank = {
  id: "01a05fd0-4de3-768b-b35f-3b47a9e65ac7",
  pageTypeSlug: "temper-rule-template",
  slug: "other-currency-bank",
  title: "Bank other currencies",
  key: "other-currency-bank",
  description:
    "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
  categoryId: "currency",
  displayOrder: 1,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
