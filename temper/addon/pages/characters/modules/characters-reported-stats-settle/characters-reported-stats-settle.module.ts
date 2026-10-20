import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersReportedStatsSettle = {
  id: "01a159a6-af41-7608-aba1-1861ea3b143c",
  type: "page-type/module",
  slug: "characters-reported-stats-settle",
  definition: "whether the game's numbers for the bar held have stopped changing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading is kept only where a capture a second or more later gives the same bar, build and stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That later capture gives the same buffs as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That later capture gives the same advanced stats the game's sheet shows too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every capture not yet agreed on is taken again a second and a half later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two captures a second or more apart that agree are enough to keep a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture a build event takes starts a fresh run of retakes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A retake that differs from the capture before it is taken again, however many ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A retake that agrees with the capture before it always keeps a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of retakes that never agrees ends two minutes after it started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading kept ends the retaking.",
    },
  ],
  createdAt: "2026-10-20T14:10:58.497Z",
  updatedAt: "2026-10-20T17:12:21.574Z",
} as const satisfies Module
