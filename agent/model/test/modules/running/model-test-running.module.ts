import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelTestRunning = {
  id: "01a0915e-d3cf-711b-b81e-034c2d603efa",
  type: "page-type/module",
  slug: "model-test-running",
  definition: "a model test's labelled cases put to its model and weighed against their labels",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The prompt for a case is built by the code beside the test rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test's code is handed a way to read a page rather than reading the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A case is put to the model once for each thing its test asks about that case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer comes back beside the name of what it answers about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A judged case carries the prompt put for it beside the answer that came back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A case a test asks nothing about is answered as reaching nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A case reaching nothing is kept in the answer rather than left out of it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether an answer keeps a case is judged by the code beside the test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test is run against another test's cases where the caller names that test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test naming no other test is run against its own cases.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run reaching no model throws rather than answering every case broken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows what any test is about.",
    },
  ],
} as const satisfies Module
