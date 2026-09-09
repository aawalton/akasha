import type { Module } from "@akasha/code/module"

export const inferenceCommandLine = {
  id: "01a0685d-4b35-7015-aa1c-9945a87334df",
  pageTypeSlug: "module",
  type: "module",
  slug: "inference-command-line",
  definition: "the command line a run is recorded as having been asked for by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument with whitespace is quoted and every other argument is left bare.",
    },
  ],
} as const satisfies Module
