import type { Command } from "@akasha/command-system/command"

export const emailMessagesGet = {
  id: "01a06810-cf11-79cf-8583-56ab486a6b70",
  pageTypeSlug: "command",
  slug: "email-messages-get",
  definition: "the command fetching one Gmail message whole, its plain-text body decoded",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id stands after the command" },
  ],
  helpNotes: [
    "the message comes back with its full headers and the first plain-text part decoded as its body.",
    "the attachments hanging off it are named by `email attachments list`.",
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
} as const satisfies Command
