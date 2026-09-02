import type { Module } from "@akasha/code-system/module"

export const inventoryRulesDispatchBankDeposits = {
  id: "01a06258-b530-7646-901c-b102e187b412",
  pageTypeSlug: "module",
  slug: "inventory-rules-dispatch-bank-deposits",
  definition: "depositing items into the bank by rule, reserving slots as it goes",
  code: "ts",
} as const satisfies Module
