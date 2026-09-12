import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatPageAkasha = {
  id: "01a06949-b281-7061-a6d8-d3c8324a028f",
  type: "module",
  slug: "seat-page-akasha",
  definition: "where a seat's page lives in akasha, and the writing or removal of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every seat page sits under the folder the index files the seat type's pages in.",
    },
    {
      invariantKind: "departure",
      statement: "Where that folder is, and what a seat page is named, are answered elsewhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values written are the bare ones rather than the records those values came in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat given no parent name takes the name derived from its agent id.",
    },
    {
      invariantKind: "departure",
      statement: "Removing a seat page requires a reason for the stop.",
    },
    {
      invariantKind: "departure",
      statement: "A write that was refused has the reason for that refusal as its detail.",
    },
  ],
} as const satisfies Module
