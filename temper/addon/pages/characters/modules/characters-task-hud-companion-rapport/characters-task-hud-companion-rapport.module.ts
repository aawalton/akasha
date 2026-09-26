import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudCompanionRapport = {
  id: "01a062ee-f050-706b-865b-cca0db9bf255",
  type: "page-type/module",
  slug: "characters-task-hud-companion-rapport",
  definition: "the first companion not yet finished, with the quest and dailies left for her",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion is finished once her rapport is full and every quest of hers is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest the player can take now is named before the dailies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where she has no quest to take now, the first quest another companion has is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No daily is named for a companion whose rapport is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A daily is named only where that daily is worth a hundred and twenty-five rapport.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A daily is named with whoever offers it.",
    },
  ],
} as const satisfies Module
