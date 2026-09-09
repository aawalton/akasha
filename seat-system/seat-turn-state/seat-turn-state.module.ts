import type { Module } from "@akasha/code/module"

export const seatTurnState = {
  id: "01a0695a-d2ea-7c13-b182-16f7c69f5587",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A seat in an on-call role is ready for more work rather than idle.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat ready for work is told apart from a seat waiting on a turn already arranged.",
    },
    {
      invariantKind: "departure",
      statement: "The role's on-call flag decides rather than the seat's own on-call flag.",
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
