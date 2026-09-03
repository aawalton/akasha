import type { Module } from "@akasha/code-system/module"

export const pipelinePageReading = {
  id: "01a0686c-e937-7005-a510-831dfc250946",
  pageTypeSlug: "module",
  slug: "pipeline-page-reading",
  definition: "the pipeline, workflow and step pages a pipeline command asks after, read as rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type no query can reach is an operational fault rather than an empty answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seq naming no pipeline is the caller's data fault, named with the pipeline asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding the wrong kind of value is refused rather than read as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A step is answered only where its workflow was among those asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A hyphenated page key is answered under its camel-case name.",
    },
    {
      invariantKind: "departure",
      statement: 'A stored "true", "false" or number is answered as one rather than as text.',
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
