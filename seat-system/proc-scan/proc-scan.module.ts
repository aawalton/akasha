import type { Module } from "@akasha/code/module"

export const procScan = {
  id: "01a0695a-d2ea-7a46-91a8-5f8779a67282",
  pageTypeSlug: "module",
  type: "module",
  slug: "proc-scan",
  definition: "every process under /proc with an AGENT_ID, with its command line, parent and state",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process names the agent that process acts under as well as the agent that process runs as.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process naming no acting agent carries no acting agent rather than carrying its own.",
    },
  ],
} as const satisfies Module
