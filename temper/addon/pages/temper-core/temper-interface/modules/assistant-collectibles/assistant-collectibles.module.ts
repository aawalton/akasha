import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assistantCollectibles = {
  id: "01a060e7-1beb-7c7c-8f92-e0f5d84c2110",
  type: "page-type/module",
  slug: "assistant-collectibles",
  definition: "the collectible ids of every personal assistant the player may summon",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An assistant collectible id is the game's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each id is copied rather than worked out.",
    },
  ],
  createdAt: "2026-09-02T06:55:53.835Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
