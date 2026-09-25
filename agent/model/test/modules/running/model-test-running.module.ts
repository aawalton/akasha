import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelTestRunning = {
  id: "01a0915e-d3cf-711b-b81e-034c2d603efa",
  type: "page-type/module",
  slug: "model-test-running",
  definition: "how code runs a model test against its cases",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The prompt for a case is built by the code beside the test rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test's code is handed a way to read a page rather than reading the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is put to the model once for each thing its test asks about that case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer comes back beside the name of what it answers about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judged case carries the prompt put for it beside the answer that came back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case a test asks nothing about is answered as reaching nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case reaching nothing is kept in the answer rather than left out of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether an answer keeps a case is judged by the code beside the test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test is run against another test's cases where the caller names that test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test naming no other test is run against its own cases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run where no prompt reached a model throws rather than answering every case broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case any of whose prompts reached no model is answered as reaching nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case whose prompts all answered is judged though another case's reached no model.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows what any test is about.",
    },
  ],
} as const satisfies Module
