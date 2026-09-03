import type { Module } from "@akasha/code-system/module"

export const seatStated = {
  id: "01a06949-b281-77c6-88b0-b1d74cede208",
  pageTypeSlug: "module",
  slug: "seat-stated",
  definition: "all a seat says of itself, gathered in one read and filled from history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a seat says now wins over what its history held.",
    },
    {
      invariantKind: "departure",
      statement: "History fills only the values a seat no longer says.",
    },
    {
      invariantKind: "departure",
      statement: "A seat short of a persona, a role or an account is one to recover.",
    },
    {
      invariantKind: "departure",
      statement: "Each observed key is copied from the page back into the record beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A value the seat asks to clear is dropped rather than carried forward.",
    },
  ],
} as const satisfies Module
