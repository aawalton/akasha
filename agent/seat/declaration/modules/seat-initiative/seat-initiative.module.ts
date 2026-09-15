import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatInitiative = {
  id: "01a06949-b281-745b-96f6-05ec9619e469",
  type: "module",
  slug: "seat-initiative",
  definition: "a seat's initiative, found by slug in akasha and read off the assignment it states",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative is found by its slug through the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug reaches one initiative or no initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's initiative is the assignment that seat states addressed as an initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment naming another page type is no initiative.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug naming no initiative is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The initiatives akasha knows are named back.",
    },
  ],
} as const satisfies Module
