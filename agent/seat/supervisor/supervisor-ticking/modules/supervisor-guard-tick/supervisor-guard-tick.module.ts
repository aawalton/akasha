import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGuardTick = {
  id: "01a0683e-3dbe-7022-adf7-a141c00ada4a",
  type: "page-type/module",
  slug: "supervisor-guard-tick",
  definition: "a timer tick whose fault is handed to a handler rather than thrown",
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
} as const satisfies Module
