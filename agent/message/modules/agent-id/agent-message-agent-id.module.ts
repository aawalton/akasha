import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageAgentId = {
  id: "01a0686c-f06b-700f-b509-474c22d7c815",
  type: "page-type/module",
  slug: "agent-message-agent-id",
  definition: "the agent a program sends messages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The agent is stated in the environment rather than worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An environment naming no agent stops the server rather than guessing an agent.",
    },
  ],
  createdAt: "2026-09-03T17:59:25.035Z",
  updatedAt: "2026-09-25T17:57:50.000Z",
} as const satisfies Module
