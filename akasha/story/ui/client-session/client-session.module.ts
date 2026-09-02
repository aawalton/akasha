import type { Module } from "@akasha/code-system/module"

export const clientSession = {
  id: "01a0628e-a5da-732b-938e-933b89640adc",
  pageTypeSlug: "module",
  slug: "client-session",
  definition:
    "a game state narrowed to the hud, beats, quests, sheet and chapter links a browser gets",
  code: "ts",
} as const satisfies Module
