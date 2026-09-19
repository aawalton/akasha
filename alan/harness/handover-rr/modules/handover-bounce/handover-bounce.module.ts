import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverBounce = {
  id: "01a0bb5b-8f41-7780-9975-3de2710f47c0",
  type: "page-type/module",
  slug: "handover-bounce",
  definition:
    "the headers a guard's bounce carries on, and whether that bounce went to a sign-in page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bounce's location is dropped and its cookies are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each cookie a bounce sets is appended, so none writes over another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root route is told which path a sign-in is at rather than knowing it here.",
    },
  ],
} as const satisfies Module
