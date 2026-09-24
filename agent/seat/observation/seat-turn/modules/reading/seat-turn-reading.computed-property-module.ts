import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const seatTurnReading = {
  id: "01a0d416-14c8-723e-a944-098f02facb4a",
  type: "page-type/computed-property-module",
  slug: "seat-turn-reading",
  definition:
    "a seat taken as working, idle, waiting or stopped, from the records it kept and its process",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a calculation reads a seat's turn the same way.",
    },
  ],
} as const satisfies ComputedPropertyModule
