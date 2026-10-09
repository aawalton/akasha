import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const onCompleteRunning = {
  id: "01a12097-f239-7cc0-b758-732a99d139d8",
  type: "page-type/module",
  slug: "on-complete-running",
  definition: "the run of each to-do's on-complete code once that to-do is newly completed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A completion is new where it is later than the completion the to-do is done with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The completion a to-do is done with is kept beside that to-do outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That completion is written before the code runs, so no completion runs twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A to-do seen first is done with its last completion, or with the present where it has none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A to-do seen first runs nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code that throws is reported and is not run again for that completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code is loaded from the checkout at each run.",
    },
  ],
  createdAt: "2026-10-09T12:16:31.289Z",
  updatedAt: "2026-10-09T12:16:31.289Z",
} as const satisfies Module
