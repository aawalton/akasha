import type { Module } from "@akasha/code-system/module"

export const seatNaming = {
  id: "01a05d8f-8e76-7000-8995-00035a086006",
  pageTypeSlug: "module",
  slug: "seat-naming",
  definition: "a seat's name, spelled from what it is assigned and who its principal is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's name is the domain and the role and the flex joined in that order.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose role is the handler role is named for its domain alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona names a seat outright only where it is not the persona a seat begins with.",
    },
    {
      invariantKind: "departure",
      statement: "The persona a seat begins with is read from the seat's page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's flex is carried in its name rather than beside it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page from disk.",
    },
  ],
} as const satisfies Module
