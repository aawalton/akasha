import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersElderDragonPairing = {
  id: "01a15a4c-bf47-7be9-8d2b-8c14b4d10642",
  type: "page-type/module",
  slug: "characters-elder-dragon-pairing",
  definition: "the Health each Elder Dragon health recovery value was worked out from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Health of the last two power updates the game sent is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With Elder Dragon bought and Health below full, health recovery is read every tenth of a second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each change in health recovery keeps a reading at once, with no settling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That reading keeps the Health held now and the Health of the power update before the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading stops once Health is full again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reading keeps the amount Elder Dragon's own text says it gives now.",
    },
  ],
  createdAt: "2026-10-20T17:12:21.574Z",
  updatedAt: "2026-10-20T17:21:50.750Z",
} as const satisfies Module
