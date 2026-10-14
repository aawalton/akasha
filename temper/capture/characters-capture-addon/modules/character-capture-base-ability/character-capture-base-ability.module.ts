import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureBaseAbility = {
  id: "01a0616b-2ab0-76e4-88f5-494ff9be08f5",
  type: "page-type/module",
  slug: "character-capture-base-ability",
  definition: "the catalogued ability behind a slotted ability",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slotted ability is read as the morph it belongs to, as the skill catalog has it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The morph is read from the game's own map from an ability to its progression.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That map holds chained abilities and each rank of a passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability the game maps to no progression is read as itself.",
    },
  ],
  createdAt: "2026-09-02T09:20:08.368Z",
  updatedAt: "2026-10-14T13:35:14.571Z",
} as const satisfies Module
