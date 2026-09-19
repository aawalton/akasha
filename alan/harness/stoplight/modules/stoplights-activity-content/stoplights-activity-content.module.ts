import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stoplightsActivityContent = {
  id: "01a0ba93-4f27-70aa-884c-3c2b957eadf7",
  type: "page-type/module",
  slug: "stoplights-activity-content",
  definition: "the thirteen stoplights shaped the way the live activity reads them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The three groups are in one order, which the lock screen draws them in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming no stoplight and no color is left out rather than drawn black.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stoplight with no label of its own is labelled by its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the reading does not carry is carried as null rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Both the app handing a reading over and the workstation pushing one shape it here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a group or sends one.",
    },
  ],
} as const satisfies Module
