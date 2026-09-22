import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatActionWidget = {
  id: "01a0617f-5839-710d-b891-97cc44fe55f8",
  type: "page-type/module",
  slug: "combat-action-widget",
  definition: "an icon with its duration, stack count and cooldown sweep",
  code: "ts",
} as const satisfies Module
