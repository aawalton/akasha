import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudCompanionRapport = {
  id: "01a062ee-f050-706b-865b-cca0db9bf255",
  type: "page-type/module",
  slug: "characters-task-hud-companion-rapport",
  definition: "the first companion whose rapport is not full, with the dailies that raise it",
  code: "ts",
  decisions: [
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
