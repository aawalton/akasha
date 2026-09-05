import type { Module } from "@akasha/code-system/module"

export const seatCall = {
  id: "01a069d0-78a2-7469-99bf-2a7d3a0b5a78",
  pageTypeSlug: "module",
  slug: "seat-call",
  definition: "one seat call read off a payload, for the shell that launches a seat",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Who a seat is is answered as a read rather than through a command.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat launch reads who the seat is over the payload rather than through a second call.",
    },
    {
      invariantKind: "departure",
      statement: "One key per line is the contract with the caller.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute a seat does not state prints the word null.",
    },
    {
      invariantKind: "departure",
      statement: "A line left off would read as an empty value rather than an absent one.",
    },
    {
      invariantKind: "departure",
      statement: "This module reads the seat it names rather than the caller's own.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no agent is refused.",
    },
  ],
} as const satisfies Module
