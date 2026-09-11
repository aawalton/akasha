import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const modelTestRunning = {
  id: "01a0915e-d3cf-711b-b81e-034c2d603efa",
  type: "module",
  slug: "model-test-running",
  definition: "a model test's labelled cases put to its model and weighed against their labels",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The prompt for a case is built by the code beside the test rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A test's code is handed a way to read a page rather than reading the index.",
    },
    {
      invariantKind: "departure",
      statement: "A case is put to the model once for each thing its test asks about that case.",
    },
    {
      invariantKind: "departure",
      statement: "An answer comes back beside the name of what it answers about.",
    },
    {
      invariantKind: "departure",
      statement: "A judged case carries the prompt put for it beside the answer that came back.",
    },
    {
      invariantKind: "departure",
      statement: "A case a test asks nothing about is answered as reaching nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A case reaching nothing is kept in the answer rather than left out of it.",
    },
    {
      invariantKind: "departure",
      statement: "Whether an answer keeps a case is judged by the code beside the test.",
    },
    {
      invariantKind: "departure",
      statement: "A test is run against another test's cases where the caller names that test.",
    },
    {
      invariantKind: "departure",
      statement: "A test naming no other test is run against its own cases.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching no model throws rather than answering every case broken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what any test is about.",
    },
  ],
} as const satisfies Module
