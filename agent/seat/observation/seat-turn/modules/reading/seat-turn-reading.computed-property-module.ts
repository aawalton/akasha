import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const seatTurnReading = {
  id: "01a0d416-14c8-723e-a944-098f02facb4a",
  type: "page-type/computed-property-module",
  slug: "seat-turn-reading",
  definition: "what a seat is doing",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation reads a seat's turn from the records kept beside the seat's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's process is not read there, so a seat naming one is not taken as gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat naming no process is taken as gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's turn is answered as the address of its turn state's page.",
    },
  ],
} as const satisfies ComputedPropertyModule
