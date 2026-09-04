import type { Module } from "@akasha/code-system/module"

export const seatRecovery = {
  id: "01a0687e-5361-7000-b809-2c591fc15c79",
  pageTypeSlug: "module",
  slug: "seat-recovery",
  definition: "the process trees a restarted seat left behind, reaped before the seat runs again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The process doing the reaping is never among the processes reaped.",
    },
    {
      invariantKind: "departure",
      statement: "A process tree is found by the agent id its command line carries.",
    },
    {
      invariantKind: "departure",
      statement: "A keeper named by the caller is left standing.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that finds nothing says nothing.",
    },
  ],
} as const satisfies Module
