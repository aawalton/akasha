import type { Module } from "@akasha/code-system/module"

export const agentTurnDrawn = {
  id: "01a06966-501e-7364-ba85-aba175e8b52a",
  pageTypeSlug: "module",
  slug: "agent-turn-drawn",
  definition: "an agent's turn state rendered for drawing, for one agent or for many at once",
  code: "ts",
} as const satisfies Module
