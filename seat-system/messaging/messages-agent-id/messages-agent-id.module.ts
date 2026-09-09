import type { Module } from "@akasha/code/module"

export const messagesAgentId = {
  id: "01a0686c-f06b-700f-b509-474c22d7c815",
  pageTypeSlug: "module",
  type: "module",
  slug: "messages-agent-id",
  definition: "the agent a message server is running for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The agent is stated in the environment rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement: "An environment naming no agent stops the server rather than guessing an agent.",
    },
  ],
} as const satisfies Module
