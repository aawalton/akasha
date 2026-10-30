import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRecovery = {
  id: "01a0687e-5361-7000-b809-2c591fc15c79",
  type: "page-type/module",
  slug: "seat-recovery",
  definition: "how code ends the processes a seat started before the seat was restarted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The process doing the reaping is never among the processes reaped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process tree is found by the agent id its command line has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keeper named by the caller is left standing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep that finds nothing says nothing.",
    },
  ],
  createdAt: "2026-09-03T18:18:24.481Z",
  updatedAt: "2026-10-30T14:46:54.392Z",
} as const satisfies Module
