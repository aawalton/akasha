import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDeferredRestartProbe = {
  id: "01a0683e-3dbe-701d-8d02-1a1db2476e25",
  type: "page-type/module",
  slug: "supervisor-deferred-restart-probe",
  definition: "how code reads before a timer ends whether an agent is working",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A probe past its tick reads busy rather than holding the tick open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A probe that faults reads busy rather than idle.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:42:42.311Z",
} as const satisfies Module
