import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runPaging = {
  id: "01a0c959-d154-7145-8ee6-b55998378f85",
  type: "page-type/module",
  slug: "run-paging",
  definition: "one run of a mechanic, made into the values and the file a page of it carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is named for its game and for how many runs that game has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run's page carries what a reader looks a run up by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file beside the page carries the run whole, and the hash is taken over it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
