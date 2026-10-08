import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolInteractionState = {
  id: "01a0611d-84c9-773b-b409-f70118da30cb",
  type: "page-type/module",
  slug: "companion-qol-interaction-state",
  definition: "when a companion was dismissed for an interaction and whether to bring it back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion dismissed by the player is told apart from a companion dismissed for an interaction.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.625Z",
  updatedAt: "2026-09-22T01:32:08.000Z",
} as const satisfies Module
