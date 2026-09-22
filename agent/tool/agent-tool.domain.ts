import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const agentTool = {
  id: "01a0c9c6-00a0-70ba-b6e7-287a93b83d07",
  type: "page-type/domain",
  slug: "agent-tool",
  definition: "an act an agent calls by name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "agent tool" },
    { partOfSpeech: "part-of-speech/noun", spelling: "agent tools" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent tool states a name, what that tool does, and the shape of its input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent tool is built into the agent's program or served to that program.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One act is built into one agent's program and served to another agent's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of the two an agent tool is says nothing about what that tool does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "mcp is one of the ways an agent tool is served.",
    },
  ],
} as const satisfies Domain
