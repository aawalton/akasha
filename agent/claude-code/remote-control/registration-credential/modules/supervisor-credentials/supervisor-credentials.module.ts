import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorCredentials = {
  id: "01a0683e-3dbe-7016-a806-44c493fde84f",
  type: "page-type/module",
  slug: "supervisor-credentials",
  definition: "how a supervisor finds the current credential for a seat's registration account",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account already terminal is not pulled for again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A terminal failure is reported once rather than on every tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account whose file shows a re-auth is terminal no longer and is pulled for again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pull that faults is said and the tick ends rather than the timer dying.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-09-25T17:53:54.000Z",
} as const satisfies Module
