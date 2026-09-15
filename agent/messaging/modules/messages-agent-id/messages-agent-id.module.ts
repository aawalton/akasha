import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const messagesAgentId = {
  id: "01a0686c-f06b-700f-b509-474c22d7c815",
  type: "module",
  slug: "messages-agent-id",
  definition: "the agent a message server is running for",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The agent is stated in the environment rather than worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An environment naming no agent stops the server rather than guessing an agent.",
    },
  ],
} as const satisfies Module
