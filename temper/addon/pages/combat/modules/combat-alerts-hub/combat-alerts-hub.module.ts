import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsHub = {
  id: "01a0de75-9a8d-708e-9f1d-b9b49f96a7a1",
  type: "page-type/module",
  slug: "combat-alerts-hub",
  definition: "the table the combat alerts hang their functions and state on",
  code: "ts",
} as const satisfies Module
