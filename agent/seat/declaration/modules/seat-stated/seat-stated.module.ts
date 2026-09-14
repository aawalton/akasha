import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatStated = {
  id: "01a06949-b281-77c6-88b0-b1d74cede208",
  type: "module",
  slug: "seat-stated",
  definition: "all a seat says of itself, gathered in one read and filled from history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The values a seat says now win over the values its history held.",
    },
    {
      invariantKind: "departure",
      statement: "History fills only the values a seat no longer says.",
    },
    {
      invariantKind: "departure",
      statement: "A seat short of any value its page needs is a seat to recover.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's assignment is kept as the page type and the slug both.",
    },
    {
      invariantKind: "departure",
      statement: "Each observed key is copied from the page back into the record beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A value the seat asks to clear is dropped rather than carried forward.",
    },
  ],
} as const satisfies Module
