import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneDungeonStatus = {
  id: "01a061e7-9331-74ea-900c-b22742652fc8",
  type: "page-type/module",
  slug: "zone-dungeon-status",
  definition: "what the library answers about the player's dungeon or house",
  code: "ts",
} as const satisfies Module
