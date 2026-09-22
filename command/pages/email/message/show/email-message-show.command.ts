import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailMessageShow = {
  id: "01a06810-cf11-79cf-8583-56ab486a6b70",
  type: "page-type/command",
  slug: "email-message-show",
  definition: "the command fetching a Gmail message whole, its plain-text body decoded",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The body taken is the first plain-text part found walking the parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header is matched without regard to case.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No attachment's bytes come back here.",
    },
  ],
  name: "show",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
