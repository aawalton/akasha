import type { Module } from "@akasha/code-system/module"

export const pipelineSubject = {
  id: "01a0686c-e937-7004-a90f-729ca21b5208",
  pageTypeSlug: "module",
  slug: "pipeline-subject",
  definition: "how a pipeline is named back to whoever asked after it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: 'A pipeline is named by its seq, and by "pipeline" alone where it holds none.',
    },
    {
      invariantKind: "departure",
      statement:
        "A branch and a commit are named where they stand and passed over where they do not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seq that found no pipeline is answered with why the number names nothing rather than with the number alone.",
    },
  ],
} as const satisfies Module
