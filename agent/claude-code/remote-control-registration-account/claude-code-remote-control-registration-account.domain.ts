import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeRemoteControlRegistrationAccount = {
  id: "01a0ca81-1571-7e92-8c72-1283dae8a068",
  type: "page-type/domain",
  slug: "claude-code-remote-control-registration-account",
  definition: "a seat's model account for Claude Code",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code account" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Claude Code accounts" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every Claude Code account is a model account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No model account is a Claude Code account by being a model account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat states its Claude Code account rather than choosing one per call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credential file Claude Code reads is written from this account's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The credential of a Claude Code account is what Claude Code Remote Control is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model gateway picks the account a call is served on rather than taking this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's Claude Code account serves a model call only where the gateway picks it.",
    },
  ],
} as const satisfies Domain
