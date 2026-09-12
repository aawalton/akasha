import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageShow = {
  id: "01a06810-cf11-79cf-8583-56ab486a6b70",
  type: "command",
  slug: "email-message-show",
  definition: "the command fetching one Gmail message whole, its plain-text body decoded",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id follows the command" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The body taken is the first plain-text part found walking the parts.",
    },
    {
      invariantKind: "departure",
      statement: "A header is matched without regard to case.",
    },
    {
      invariantKind: "absence",
      statement: "No attachment's bytes come back here.",
    },
  ],
  name: "show",
} as const satisfies Command
