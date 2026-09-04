import type { Module } from "@akasha/code-system/module"

export const oldGraphProducers = {
  id: "01a06950-57ae-7064-9f94-52431246353e",
  pageTypeSlug: "module",
  slug: "old-graph-producers",
  definition: "what a producer was handed about a repository's tree and its workspace folders",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reading of a repository's tree throws.",
    },
  ],
} as const satisfies Module
