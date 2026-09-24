import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mechanicRun = {
  id: "01a0c4b7-c153-7b45-9b11-437810dd0ca8",
  type: "page-type/module",
  slug: "mechanic-run",
  definition: "a row of what a mechanic was handed and what that mechanic answered",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row says which mechanic ran, so the mechanic can be run over it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holds whatever shape the mechanic takes rather than one settled shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row follows the row before it by that row's hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is no row reads as none rather than as a row with holes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a mechanic or reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row rolled from dice says what handful was rolled and what each die showed.",
    },
  ],
} as const satisfies Module
