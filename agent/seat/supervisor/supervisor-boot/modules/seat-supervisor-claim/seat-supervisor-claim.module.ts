import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSupervisorClaim = {
  id: "01a0687e-533c-7000-b149-004c8b1c0b5f",
  type: "module",
  slug: "seat-supervisor-claim",
  definition: "a supervisor taking a seat, refused where another supervisor is still in it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat no supervisor has is taken without question.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A supervisor already with a seat takes that seat again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat held by a process that has gone is taken over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat held by a process still there refuses the claim.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A holder whose presence cannot be read is treated as there rather than as gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process is told from the next process to take its pid by the moment the process started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim from a process whose start moment cannot be read is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the seat page that states the holder.",
    },
  ],
} as const satisfies Module
