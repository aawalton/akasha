import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatResumeGuard = {
  id: "01a09c3b-ef86-751f-a701-2b8b1f05245f",
  type: "module",
  slug: "seat-resume-guard",
  definition: "whether a seat may be restarted while subagents are working under it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat nothing is present in is restarted whatever is recorded under it.",
    },
    {
      invariantKind: "departure",
      statement: "Every way of restarting a seat asks this before restarting that seat.",
    },
  ],
} as const satisfies Module
