import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const allianceWarBank = {
  id: "01a05fd0-4ddb-7c14-9671-83a57fe725a0",
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
