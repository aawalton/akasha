import type { Module } from "@akasha/code-system/module"

export const combatAddonState = {
  id: "01a0617f-5839-7d31-a637-4ab0dc45a230",
  pageTypeSlug: "module",
  slug: "combat-addon-state",
  definition: "the player name, whether a fight is on, and whether starting has finished",
  code: "ts",
} as const satisfies Module
