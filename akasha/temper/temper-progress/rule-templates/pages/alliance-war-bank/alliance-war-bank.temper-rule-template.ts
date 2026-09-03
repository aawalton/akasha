import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const allianceWarBank = {
  id: "019e3104-2622-7aa4-88e8-9c5513f4f6e8",
  pageTypeSlug: "temper-rule-template",
  slug: "alliance-war-bank",
  title: "Bank Alliance War items",
  key: "alliance-war-bank",
  description:
    "Deposits Alliance War items (siege equipment, forward camps, repair kits, etc.) in the bank for safekeeping.",
  categoryId: "alliance-war",
  displayOrder: 34,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
