import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTurnState = {
  id: "01a0695a-d2ea-7c13-b182-16f7c69f5587",
  type: "page-type/module",
  slug: "seat-turn-state",
  definition:
    "a seat taken as working, idle, waiting or stopped, from the records kept and the process named",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that kept nothing is stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose process is gone is stopped whatever the records say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose process cannot be read is not stopped for being unreadable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working seat is read as working before the records the seat waits on are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat in an on-call role is ready for more work rather than idle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat in an on-call role is ready for more work though a turn it arranged is still to come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat ready for work is told apart from a seat waiting on a turn already arranged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The role's on-call flag decides rather than the seat's own on-call flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat in no on-call role waiting on nothing is idle rather than waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that has taken no turn at all is stopped whatever its role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unread record and a record reading false are told apart.",
    },
  ],
} as const satisfies Module
