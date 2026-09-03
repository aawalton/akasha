import type { Module } from "@akasha/code-system/module"

export const generationLog = {
  id: "01a0685d-4b35-7010-9103-1427f940275e",
  pageTypeSlug: "module",
  slug: "generation-log",
  definition: "the log a generation is recorded in, and the refusal that nothing lands a row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row is refused rather than written, because a row stands inside a page's body and the store addresses paths.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the two roads that do land a row.",
    },
    {
      invariantKind: "departure",
      statement:
        "The log a run is written to is read from the environment and is `alan` where the environment says nothing.",
    },
  ],
} as const satisfies Module
