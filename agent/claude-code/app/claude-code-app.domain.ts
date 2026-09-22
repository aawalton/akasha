import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeApp = {
  id: "01a0ca92-e69a-7119-b0d8-cbe2aad57593",
  type: "page-type/domain",
  slug: "claude-code-app",
  definition: "a person's program for Claude Code",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "Claude Code app" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Anthropic writes this program rather than akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person reads a seat's turn here and writes the seat's next message here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page here states what this program shows.",
    },
  ],
} as const satisfies Domain
