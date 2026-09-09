import type { Module } from "@akasha/code/module"

export const seatInitiative = {
  id: "01a06949-b281-745b-96f6-05ec9619e469",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-initiative",
  definition: "a seat's initiative, found by slug in akasha and read off the assignment it states",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative is found by its slug through the index.",
    },
    {
      invariantKind: "departure",
      statement: "A slug reaches one initiative or no initiative.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's initiative is the assignment that seat states addressed as an initiative.",
    },
    {
      invariantKind: "departure",
      statement: "An assignment naming another page type is no initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no initiative is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The initiatives akasha knows are named back.",
    },
    {
      invariantKind: "departure",
      statement: "A place is answered only where the file that place names is there.",
    },
  ],
} as const satisfies Module
