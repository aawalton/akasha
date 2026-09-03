import type { Module } from "@akasha/code-system/module"

export const seatProcLiveness = {
  id: "01a0686d-9d5e-7009-bebb-7b79c2cfd874",
  pageTypeSlug: "module",
  slug: "seat-proc-liveness",
  definition: "which agents are alive, read from the command lines of the processes standing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process whose agent is named as no uuid stands for no agent and is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An agent's own process is its Claude child or its supervisor and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A background task is a process of a live agent that is neither the agent itself nor the infrastructure its seat leans on.",
    },
    {
      invariantKind: "departure",
      statement: "A process in uninterruptible sleep is not counted as a background task.",
    },
  ],
} as const satisfies Module
