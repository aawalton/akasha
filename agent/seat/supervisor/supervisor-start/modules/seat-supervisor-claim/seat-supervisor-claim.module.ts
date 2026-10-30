import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSupervisorClaim = {
  id: "01a0687e-533c-7000-b149-004c8b1c0b5f",
  type: "page-type/module",
  slug: "seat-supervisor-claim",
  definition: "whether a supervisor can have a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no supervisor has is taken without question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor already with a seat takes that seat again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat held by a process that has gone is taken over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat held by a process still there refuses the claim.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holder whose presence cannot be read is treated as there rather than as gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process is told from the next process to take its pid by the moment the process started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim from a process whose start moment cannot be read is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the seat page that states the holder.",
    },
  ],
  createdAt: "2026-09-03T18:18:24.444Z",
  updatedAt: "2026-10-30T14:46:22.418Z",
} as const satisfies Module
