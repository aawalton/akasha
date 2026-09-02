import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const ornateSell = {
  id: "01a05fd0-4de3-71b6-8618-5cc4e17db71e",
  pageTypeSlug: "temper-rule-template",
  slug: "ornate-sell",
  title: "Sell ornate gear",
  key: "ornate-sell",
  description:
    "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
  categoryId: "equipment",
  displayOrder: 15,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
