import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorExec = {
  id: "01a0683e-3dbe-7020-aab5-a279b45af99d",
  type: "page-type/module",
  slug: "supervisor-exec",
  definition: "a supervisor's libc calls for replacing and reaping processes",
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
} as const satisfies Module
