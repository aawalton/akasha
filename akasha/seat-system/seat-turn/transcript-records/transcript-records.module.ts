import type { Module } from "@akasha/code-system/module"

export const transcriptRecords = {
  id: "01a069c7-5c5f-7de1-bc6f-c19d7e47e408",
  pageTypeSlug: "module",
  slug: "transcript-records",
  definition: "one line of an agent transcript read into a record of what it was",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line that does not parse is read as a record carrying nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A tool result is keyed by the id of the use it answers.",
    },
  ],
} as const satisfies Module
