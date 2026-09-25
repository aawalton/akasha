import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatModes = {
  id: "01a06867-7fc9-7001-ab42-25809f0fc7df",
  type: "page-type/module",
  slug: "seat-modes",
  definition: "how code reads how a seat runs from the flags a command has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat starts interactive or headless and in no third mode.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The flag putting a seat in headless is spelled here and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command line with that flag is running headless.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command line with no flag at all is running interactive.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a seat.",
    },
  ],
} as const satisfies Module
