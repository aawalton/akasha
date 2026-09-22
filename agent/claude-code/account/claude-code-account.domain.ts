import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeAccount = {
  id: "01a0ca81-1571-7e92-8c72-1283dae8a068",
  type: "page-type/domain",
  slug: "claude-code-account",
  definition: "the model account registering a seat in Claude Code Remote Control",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code account" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code accounts" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Claude Code account is a model account picked out for one seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat states its Claude Code account rather than choosing one per call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The credential of a Claude Code account is what Claude Code Remote Control is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The accounts a model gateway calls with are not a seat's Claude Code account.",
    },
  ],
} as const satisfies Domain
