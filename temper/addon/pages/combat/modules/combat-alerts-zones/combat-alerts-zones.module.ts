import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsZones = {
  id: "01a0de75-9a8d-7f91-a516-ae585fe75c87",
  type: "page-type/module",
  slug: "combat-alerts-zones",
  definition: "the functions each zone runs as the player enters and leaves it",
  code: "ts",
} as const satisfies Module
