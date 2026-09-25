import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentProcTree = {
  id: "01a0686d-9d5e-700a-b949-3878b576dfa8",
  type: "page-type/module",
  slug: "agent-proc-tree",
  definition: "how code divides the processes an agent has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose processes form one tree has outlived no tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree kept is the tree with the stated keeper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree kept where no keeper is stated is the tree holding the newest process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process the caller is running in is never read as another agent's process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The invocation a caller runs inside reaches up to the nearest agent process.",
    },
  ],
} as const satisfies Module
