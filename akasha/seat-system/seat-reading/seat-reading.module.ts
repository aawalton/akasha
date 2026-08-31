import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "This prints one line for each key it was asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the seat pages of the old system.",
    },
  ],
} as const satisfies Module
