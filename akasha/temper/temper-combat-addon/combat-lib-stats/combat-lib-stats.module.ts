import type { Module } from "@akasha/code-system/module"

export const combatLibStats = {
  id: "01a0617f-584a-7c83-a85d-669b5be71612",
  pageTypeSlug: "module",
  slug: "combat-lib-stats",
  definition: "the player's advanced stats, read whenever the game says one moved",
  code: "ts",
} as const satisfies Module
