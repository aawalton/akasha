import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentProcLiveness = {
  id: "01a0686d-9d5e-7009-bebb-7b79c2cfd874",
  type: "page-type/module",
  slug: "agent-proc-liveness",
  definition: "the agents that have a process",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A process whose agent is named as no uuid stands for no agent and is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent's own process is its Claude child or its supervisor and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is named on a process by the agent that process acts under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process with no acting agent is evidence of nobody rather than of an end.",
    },
  ],
} as const satisfies Module
