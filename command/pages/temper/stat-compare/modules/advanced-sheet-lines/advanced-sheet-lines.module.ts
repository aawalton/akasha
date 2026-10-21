import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const advancedSheetLines = {
  id: "01a15c11-bbb5-7441-a9f5-f941d02d79a0",
  type: "page-type/module",
  slug: "advanced-sheet-lines",
  definition: "a reading's advanced stats as the game gave them, beside Temper's estimate",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The section says how many stats it holds and groups them by the panel's category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat there is set beside the name the game's panel shows it under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is estimated as the stat whose page names that row and that part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is matched as a stat case matches it, and a matched row is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent row's estimate is shown as a percent, to seven figures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row no stat's page names is shown with no estimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The section says how many of its estimates match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holds each source effect on its stat or on a stat its stat sums.",
    },
  ],
  createdAt: "2026-10-21T01:27:08.469Z",
  updatedAt: "2026-10-21T01:58:38.508Z",
} as const satisfies Module
