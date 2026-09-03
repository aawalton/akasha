import type { Module } from "@akasha/code-system/module"

export const supervisorGuardTick = {
  id: "01a0683e-3dbe-7022-adf7-a141c00ada4a",
  pageTypeSlug: "module",
  slug: "supervisor-guard-tick",
  definition: "a timer tick whose fault is handed to a handler rather than thrown",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick that throws and a tick that rejects reach the same handler.",
    },
    {
      invariantKind: "departure",
      statement: "A tick never rejects, so the timer that called it survives.",
    },
  ],
} as const satisfies Module
