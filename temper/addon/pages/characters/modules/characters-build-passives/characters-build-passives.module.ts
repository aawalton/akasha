import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildPassives = {
  id: "01a198a8-0dd7-7c60-9785-926203d69254",
  type: "page-type/module",
  slug: "characters-build-passives",
  definition: "buying and ranking up a character's target passives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is bought and ranked through the game's own point allocator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive is held once it is bought to its target rank or higher.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No passive is sold, and no respec is started for one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive the game will not sell yet is named rather than bought.",
    },
  ],
  createdAt: "2026-11-01T19:48:32.854Z",
  updatedAt: "2026-11-01T19:48:32.854Z",
} as const satisfies Module
