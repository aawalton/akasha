import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatResumeGuard = {
  id: "01a09c3b-ef86-751f-a701-2b8b1f05245f",
  type: "page-type/module",
  slug: "seat-resume-guard",
  definition: "whether a seat that subagents work under is restarted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat nothing is present in is restarted whatever is recorded under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every way of restarting a seat asks this before restarting that seat.",
    },
  ],
  createdAt: "2026-09-13T19:26:08.774Z",
  updatedAt: "2026-10-30T14:35:17.093Z",
} as const satisfies Module
