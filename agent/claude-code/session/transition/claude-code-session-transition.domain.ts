import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionTransition = {
  id: "01a0c9f5-cdad-7bb4-a56e-5fa84e5c5b7e",
  type: "page-type/domain",
  slug: "claude-code-session-transition",
  definition: "a Claude Code session's move between Claude Code session states",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session transition" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session transitions" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Claude Code session transition happens at once rather than over a span.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Claude Code session transition into a state and the one out of that state are two of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code run at a Claude Code session transition may stop that transition.",
    },
  ],
} as const satisfies Domain
