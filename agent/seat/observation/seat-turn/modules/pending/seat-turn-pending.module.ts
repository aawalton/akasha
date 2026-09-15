import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTurnPending = {
  id: "01a0695a-d2ea-7792-be19-da7a851ad311",
  type: "page-type/module",
  slug: "seat-turn-pending",
  definition: "the things a seat may be waiting on, kept beside it in akasha and read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A write that threw says why, rather than reading as a write that changed nothing.",
    },
  ],
} as const satisfies Module
