import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPageAkasha = {
  id: "01a06949-b281-7061-a6d8-d3c8324a028f",
  type: "page-type/module",
  slug: "seat-page-akasha",
  definition: "where a seat's page lives in akasha, and the writing or removal of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every seat page sits under the folder the index files the seat type's pages in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where that folder is, and what a seat page is named, are answered elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values written are the bare ones rather than the records those values came in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat given no parent name takes the name derived from its agent id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Removing a seat page requires a reason for the stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that was refused has the reason for that refusal as its detail.",
    },
  ],
} as const satisfies Module
