import type { Module } from "@akasha/code-system/module"

export const seatTurnPending = {
  id: "01a0695a-d2ea-7792-be19-da7a851ad311",
  pageTypeSlug: "module",
  slug: "seat-turn-pending",
  definition: "the things a seat may be waiting on, kept beside it in akasha and read back",
  code: "ts",
} as const satisfies Module
