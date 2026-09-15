import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const applyInvalidations = {
  id: "01a06071-0c76-73c9-ae39-c266d45d6492",
  type: "module",
  slug: "apply-invalidations",
  definition:
    "what a request to collect named catalog domains again takes out of the saved payload",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An invalidation no newer than the last invalidation seen changes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty domain list asks for every domain again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named domain the payload does not have is ignored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Applying an invalidation marks the catalog incomplete.",
    },
  ],
} as const satisfies Module
