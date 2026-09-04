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
      statement: "A seat's name is the domain followed by the role followed by the flex.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose role is the handler role is named for its domain alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona names a seat outright only where that persona is not the persona a seat begins with.",
    },
    {
      invariantKind: "departure",
      statement: "The persona a seat begins with is read from the seat's page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's flex is carried in its name rather than beside the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's name spells no on-call assignment.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's name and its terminal tab name and its Remote Control session title are one value.",
    },
    {
      invariantKind: "departure",
      statement: "A seat name is never ambiguous.",
    },
    {
      invariantKind: "departure",
      statement:
        "The narrower reading wins where more than one set of stated values would spell one name.",
    },
    {
      invariantKind: "departure",
      statement: "A seat name reaches the seat that carried the name most recently.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose principal is Alan takes its persona's name alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page from disk.",
    },
  ],
} as const satisfies Module
