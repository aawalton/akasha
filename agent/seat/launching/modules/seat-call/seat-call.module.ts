import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatCall = {
  id: "01a069d0-78a2-7469-99bf-2a7d3a0b5a78",
  type: "module",
  slug: "seat-call",
  definition: "one seat call read off a payload, for the shell that launches a seat",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Who a seat is is answered as a read rather than through a command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat launch reads who the seat is over the payload rather than through a second call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One key per line is the contract with the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute a seat does not state prints the word null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line left off would read as an empty value rather than an absent value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module reads the seat this module names rather than the caller's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no agent is refused.",
    },
  ],
} as const satisfies Module
