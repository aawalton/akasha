import type { Module } from "@akasha/code-system/module"

export const pipelinePageRows = {
  id: "01a0685e-023f-700f-8814-9ada4bd11465",
  pageTypeSlug: "module",
  slug: "pipeline-page-rows",
  definition:
    "the rows a CI page query answers, and the sequence number or the text read off one of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query the page system could not reach throws rather than answering no rows.",
    },
    {
      invariantKind: "departure",
      statement: "A sequence number is a run of digits standing for a whole number above nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that is not a text, or is a text of nothing but spaces, is read as absent.",
    },
  ],
} as const satisfies Module
