import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaEntry = {
  id: "01a0dea5-6b22-710f-9f7a-a8d61c57484b",
  type: "page-type/module",
  slug: "pithka-entry",
  definition: "what starts the achievement tracker once the player is in the world",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracker is built half a second after the player is active, and only once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The slash commands and keybind names are Pithka's Achievement Tracker's own.",
    },
  ],
  createdAt: "2026-09-26T16:56:17.954Z",
  updatedAt: "2026-09-26T16:56:28.000Z",
} as const satisfies Module
