import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicConsent = {
  id: "01a0c4f7-9456-771c-9794-93ac8bf2418b",
  type: "page-type/command",
  slug: "music-consent",
  definition: "the command asking Alan for this client's consent to reach Spotify",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The run prints the URL Alan approves at and waits for him to approve it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose callback reaches a loopback address ends on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The consent asked for covers every scope this repository names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No scope is asked for that the consent module does not name.",
    },
  ],
  name: "consent",
  arguments: [],
} as const satisfies Command
