import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatAlertsCloudrest = {
  id: "01a0dee3-667f-7c1b-a1b1-67c90e0f43d1",
  type: "page-type/module",
  slug: "combat-alerts-cloudrest",
  definition: "the Cloudrest zone registration and the reset of its values on a wipe",
  code: "ts",
} as const satisfies Module
