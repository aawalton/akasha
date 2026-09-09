import type { Module } from "@akasha/code/module"

export const seatProcLiveness = {
  id: "01a0686d-9d5e-7009-bebb-7b79c2cfd874",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-proc-liveness",
  definition: "which agents are alive, read from the command lines of the processes standing",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
        "A background task is a live agent's process that is neither the agent nor its seat's infrastructure.",
    },
    {
      invariantKind: "departure",
      statement: "A process in uninterruptible sleep is not counted as a background task.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is named on a process by the agent that process acts under.",
    },
    {
      invariantKind: "departure",
      statement: "A process with no acting agent is evidence of nobody rather than of an end.",
    },
  ],
} as const satisfies Module
