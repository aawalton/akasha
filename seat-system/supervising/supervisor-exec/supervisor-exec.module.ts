import type { Module } from "@akasha/code-system/module"

export const supervisorExec = {
  id: "01a0683e-3dbe-7020-aab5-a279b45af99d",
  pageTypeSlug: "module",
  slug: "supervisor-exec",
  definition: "the libc calls a supervisor replaces and reaps processes with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "libc is opened from this process's own mapping rather than from a named path.",
    },
    {
      invariantKind: "departure",
      statement: "A child this process may not signal is a fault rather than a liveness answer.",
    },
    {
      invariantKind: "departure",
      statement: "A liveness that cannot be read is a fault rather than a guess either way.",
    },
    {
      invariantKind: "constraint",
      statement: "This module runs on Linux alone.",
    },
  ],
} as const satisfies Module
