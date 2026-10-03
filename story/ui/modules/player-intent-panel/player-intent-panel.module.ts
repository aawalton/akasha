import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerIntentPanel = {
  id: "01a103a5-8567-7001-80db-29b0f9844af5",
  type: "page-type/module",
  slug: "player-intent-panel",
  definition: "the player's standing intent for his character, written and changed in place",
  code: "tsx",
  test: "ts",
} as const satisfies Module
