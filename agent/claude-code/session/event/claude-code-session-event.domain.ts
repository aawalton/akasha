import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionEvent = {
  id: "01a0c9d8-4cc0-7474-8d6d-18890c44e6a5",
  type: "page-type/domain",
  slug: "claude-code-session-event",
  definition: "a named Claude Code session transition",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session event" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session events" },
    { partOfSpeech: "part-of-speech/noun", spelling: "session event", scope: "domain/claude-code" },
    {
      partOfSpeech: "part-of-speech/noun",
      spelling: "session events",
      scope: "domain/claude-code",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every Claude Code session event is named by Claude Code rather than by akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Claude Code session event no hook is called at is a Claude Code session event still.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Claude Code session event before an act and one after that act are two of them.",
    },
  ],
} as const satisfies Domain
