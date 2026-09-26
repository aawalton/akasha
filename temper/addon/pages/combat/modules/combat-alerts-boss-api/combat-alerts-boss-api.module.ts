import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsBossApi = {
  id: "01a0de82-cb80-7664-873b-08f0e5d56207",
  type: "page-type/module",
  slug: "combat-alerts-boss-api",
  definition: "the boss health bar thresholds lookup and threshold change listeners",
  code: "ts",
} as const satisfies Module
