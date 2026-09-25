import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reasonMarks = {
  id: "01a0d8f7-e49c-711c-93d9-90a545c2b03f",
  type: "page-type/module",
  slug: "reason-marks",
  definition:
    "what a reason seen at a second account decides about the account first disabled for it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason no account has marked decides mark-rebind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason the current account marked first decides mark-rebind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason another account marked first decides global-unmark naming that account.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the map of marked reasons.",
    },
  ],
} as const satisfies Module
