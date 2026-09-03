import type { Module } from "@akasha/code-system/module"

export const seatSupervisorClaim = {
  id: "01a0687e-533c-7000-b149-004c8b1c0b5f",
  pageTypeSlug: "module",
  slug: "seat-supervisor-claim",
  definition: "a supervisor taking a seat, refused where another supervisor still stands in it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat no supervisor holds is taken without question.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor already holding a seat takes that seat again.",
    },
    {
      invariantKind: "departure",
      statement: "A seat held by a process that has gone is taken over.",
    },
    {
      invariantKind: "departure",
      statement: "A seat held by a process still standing refuses the claim.",
    },
    {
      invariantKind: "departure",
      statement:
        "A holder whose presence cannot be read is treated as standing rather than as gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process is told from the next process to take its pid by the moment the process started.",
    },
    {
      invariantKind: "departure",
      statement: "A claim from a process whose start moment cannot be read is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the seat page that states the holder.",
    },
  ],
} as const satisfies Module
