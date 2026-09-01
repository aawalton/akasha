import type { Module } from "@akasha/code-system/module"

export const seatNameClaim = {
  id: "01a05ded-fa5d-7000-b57d-b4a2a894e5e6",
  pageTypeSlug: "module",
  slug: "seat-name-claim",
  definition: "whether a seat may take the name it asks for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One name reaches one seat.",
    },
    {
      invariantKind: "departure",
      statement: "A name reading as an id is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A seat retaking the name it already holds is allowed without any further test.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name held by a seat with a process in it is refused unless the caller says to take it.",
    },
    {
      invariantKind: "departure",
      statement: "A caller whose own seat holds the name takes it back without saying so.",
    },
    {
      invariantKind: "departure",
      statement: "Which names are admitted is handed in rather than read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes what a seat states.",
    },
  ],
} as const satisfies Module
