import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsBossSpoofing = {
  id: "01a0de8a-8485-77cb-9142-9f2e01b7474a",
  type: "page-type/module",
  slug: "combat-alerts-boss-spoofing",
  definition: "the boss health bars shown for units that are no boss, and their tracked health",
  code: "ts",
} as const satisfies Module
