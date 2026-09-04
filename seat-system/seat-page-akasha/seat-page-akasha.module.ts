import type { Module } from "@akasha/code-system/module"

export const seatPageAkasha = {
  id: "01a06949-b281-7061-a6d8-d3c8324a028f",
  pageTypeSlug: "module",
  slug: "seat-page-akasha",
  definition: "where a seat's page lives in akasha, and the writing or removal of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every seat page sits under akasha/seat-system/seats/pages.",
    },
    {
      invariantKind: "departure",
      statement: "A seat page's file name is the seat name followed by .seat.ts.",
    },
    {
      invariantKind: "departure",
      statement: "The values written are the bare ones rather than the records they came in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat given no parent name takes the one derived from its agent id.",
    },
    {
      invariantKind: "departure",
      statement: "Removing a seat page requires a reason for the stop.",
    },
    {
      invariantKind: "departure",
      statement: "A write that was refused carries what was said as its detail.",
    },
  ],
} as const satisfies Module
