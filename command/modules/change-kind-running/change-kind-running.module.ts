import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeKindRunning = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  type: "page-type/module",
  slug: "change-kind-running",
  definition: "what a run of a change kind does about the checks and the readings owed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The checks a change kind runs and the readings that kind owes are what a run of it does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call with no change kind runs every check and owes every reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes into the checkout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No whole body is carried here.",
    },
  ],
} as const satisfies Module
