import type { Module } from "@akasha/code/module"

export const generationLog = {
  id: "01a0685d-4b35-7010-9103-1427f940275e",
  pageTypeSlug: "module",
  type: "module",
  slug: "generation-log",
  definition: "the log a generation is recorded in, and the refusal that nothing lands a row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the two roads that do land a row.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's log is read from the environment and is `alan` where the environment says nothing.",
    },
  ],
} as const satisfies Module
