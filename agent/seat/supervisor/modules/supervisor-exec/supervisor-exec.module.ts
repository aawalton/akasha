import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorExec = {
  id: "01a0683e-3dbe-7020-aab5-a279b45af99d",
  type: "page-type/module",
  slug: "supervisor-exec",
  definition: "the calls a supervisor makes on processes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "libc is opened from this process's own mapping rather than from a named path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child this process may not signal is a fault rather than a liveness answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A liveness that cannot be read is a fault rather than a guess either way.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This module runs on Linux alone.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:50:21.798Z",
} as const satisfies Module
