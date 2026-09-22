import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionEvent = {
  id: "01a0c9d8-4cc0-7474-8d6d-18890c44e6a5",
  type: "page-type/domain",
  slug: "claude-code-session-event",
  definition: "a named moment in a session",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "session event" },
    { partOfSpeech: "part-of-speech/noun", spelling: "session events" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Claude Code names every session event, and akasha names none of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session event no hook is called at is a session event still.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session event before an act and one after that act are two session events.",
    },
  ],
} as const satisfies Domain
