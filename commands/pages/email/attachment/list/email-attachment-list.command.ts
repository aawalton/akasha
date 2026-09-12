import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailAttachmentList = {
  id: "01a06810-cf11-7f4d-8623-a42314e41ab3",
  type: "command",
  slug: "email-attachment-list",
  definition: "the command naming the filename, type, size and id of a message's attachments",
  code: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is an attachment only where that part has both a filename and an id.",
    },
    {
      invariantKind: "departure",
      statement: "Nested parts are walked to the bottom.",
    },
    {
      invariantKind: "absence",
      statement: "No attachment's bytes are read here.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
