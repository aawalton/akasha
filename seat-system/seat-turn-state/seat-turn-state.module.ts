import type { Module } from "@akasha/code-system/module"

export const seatTurnState = {
  id: "01a0695a-d2ea-7c13-b182-16f7c69f5587",
  pageTypeSlug: "module",
  slug: "seat-turn-state",
  definition:
    "a seat read as working, idle, waiting or stopped, from the records kept and the process named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat that kept nothing is stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose process is gone is stopped whatever the records say.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose process cannot be read is not stopped for being unreadable.",
    },
    {
      invariantKind: "departure",
      statement: "A working seat is read as working before the records the seat waits on are read.",
    },
    {
      invariantKind: "departure",
      statement: "A seat in an on-call role is waiting on work sent to it rather than idle.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a seat's role is on call answers this rather than whether the seat is.",
    },
    {
      invariantKind: "departure",
      statement: "A seat in no on-call role waiting on nothing is idle rather than waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that has taken no turn at all is stopped whatever its role.",
    },
    {
      invariantKind: "departure",
      statement: "An unread record and a record reading false are told apart.",
    },
  ],
} as const satisfies Module
