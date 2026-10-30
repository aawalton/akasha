import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGuardTick = {
  id: "01a0683e-3dbe-7022-adf7-a141c00ada4a",
  type: "page-type/module",
  slug: "supervisor-guard-tick",
  definition: "how code handles an error in the work a timer runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that throws and a tick that rejects reach the same handler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick never rejects.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The timer that called a tick survives.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:36:35.293Z",
} as const satisfies Module
