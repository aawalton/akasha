import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeSessionState = {
  id: "01a0ca0f-33c7-78f8-89c7-c79ecf784fac",
  type: "page-type/domain",
  slug: "claude-code-session-state",
  definition: "what a Claude Code session is doing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session state" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code session states" },
    { partOfSpeech: "part-of-speech/noun", spelling: "session state", scope: "domain/claude-code" },
    {
      partOfSpeech: "part-of-speech/noun",
      spelling: "session states",
      scope: "domain/claude-code",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Claude Code session is in one Claude Code session state at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Claude Code session state is bounded by the Claude Code session events either side of it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the Claude Code session states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's turn state is akasha's reading of a seat rather than one of these.",
    },
  ],
} as const satisfies Domain
