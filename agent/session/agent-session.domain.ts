import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const agentSession = {
  id: "01a0c9ae-c6f4-7f63-9f96-c0cd1f7d3b0d",
  type: "page-type/domain",
  slug: "agent-session",
  definition: "a conversation an agent has",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "agent session" },
    { partOfSpeech: "part-of-speech/noun", spelling: "agent sessions" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent session is one agent, and one agent is one session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session the agent takes up again is the same session rather than a second one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a session holds is the words each side wrote, in the order written.",
    },
  ],
} as const satisfies Domain
