import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageWithProperties = {
  id: "01a05cac-2a4f-74fa-a0c3-9ea5542cdf79",
  type: "module",
  slug: "page-with-properties",
  definition: "a page read as its id beside the properties it has",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page in a list with a given id is found here rather than by each reader.",
    },
  ],
} as const satisfies Module
