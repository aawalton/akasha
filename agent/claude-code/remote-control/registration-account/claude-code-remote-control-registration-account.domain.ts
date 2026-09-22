import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const claudeCodeRemoteControlRegistrationAccount = {
  id: "01a0ca81-1571-7e92-8c72-1283dae8a068",
  type: "page-type/domain",
  slug: "claude-code-remote-control-registration-account",
  definition: "a seat's model account for Claude Code Remote Control",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "registration account" },
    { partOfSpeech: "part-of-speech/noun", spelling: "registration accounts" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every registration account is a model account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No model account is a registration account by being a model account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat states its registration account rather than choosing one per call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The credential file Claude Code reads is written from the registration account's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The credential of a registration account is what Claude Code Remote Control is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model gateway picks the account a call is served on rather than taking this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's registration account serves a model call only where the gateway picks it.",
    },
  ],
} as const satisfies Domain
