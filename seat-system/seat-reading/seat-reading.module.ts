import type { Module } from "@akasha/code-system/module"

export const seatReading = {
  id: "01a05850-0f6a-7ed4-b9e5-6868da68bd0c",
  pageTypeSlug: "module",
  slug: "seat-reading",
  definition: "what a seat states, read from the page standing for it here",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is found by the agent's id rather than by the name of its page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is found by the session the seat answers in where no seat carries the id.",
    },
    {
      invariantKind: "departure",
      statement: "An id the index does not carry is answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A root holding no seat index is refused rather than read as holding no seats.",
    },
    {
      invariantKind: "departure",
      statement: "A value is answered under the key the old system's readers ask by.",
    },
    {
      invariantKind: "departure",
      statement: "The root is the one the file itself stands in.",
    },
    {
      invariantKind: "departure",
      statement: "This module prints one line for each key it was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaches a seat's page without the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mark a supervisor is read from is parted from its start moment by its last `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A mark naming no moment a supervisor started is no supervisor that can be read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the seat pages of the old system.",
    },
  ],
} as const satisfies Module
