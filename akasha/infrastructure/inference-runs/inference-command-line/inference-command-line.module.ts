import type { Module } from "@akasha/code-system/module"

export const inferenceCommandLine = {
  id: "01a0685d-4b35-7015-aa1c-9945a87334df",
  pageTypeSlug: "module",
  slug: "inference-command-line",
  definition: "the command line a run is recorded as having been asked for by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument holding whitespace is quoted and every other is left bare.",
    },
  ],
} as const satisfies Module
