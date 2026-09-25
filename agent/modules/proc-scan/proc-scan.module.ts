import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const procScan = {
  id: "01a0695a-d2ea-7a46-91a8-5f8779a67282",
  type: "page-type/module",
  slug: "proc-scan",
  definition: "every process that has an agent id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process names the agent that process acts under as well as the agent that process runs as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process naming no acting agent carries no acting agent rather than carrying its own.",
    },
  ],
} as const satisfies Module
