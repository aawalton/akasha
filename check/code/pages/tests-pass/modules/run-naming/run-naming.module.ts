import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runNaming = {
  id: "01a0b7c9-d8d8-78e8-bb82-9ac8ee8f4e4b",
  type: "page-type/module",
  slug: "run-naming",
  definition: "what a change names for the test run that change calls for",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A changed file is asked for the tests beside it by name rather than by listing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the change answers no body for is left out of the names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is answered once however many changed files name it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are answered sorted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest is read for the name its package is reached under and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That name is answered against the folder the link would sit in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a test, reads a run or writes a body.",
    },
  ],
} as const satisfies Module
