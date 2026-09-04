import type { Command } from "@akasha/command-system/command"

export const emailAttachmentsList = {
  id: "01a06810-cf11-7f4d-8623-a42314e41ab3",
  pageTypeSlug: "command",
  slug: "email-attachments-list",
  definition: "the command naming the filename, type, size and id of a message's attachments",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id stands after the command" },
  ],
  helpNotes: [
    "each attachment is named with its filename, its type, its size and the id its bytes are fetched by.",
    "the bytes themselves are fetched by `email attachments get`.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is an attachment only where it carries both a filename and an id.",
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
} as const satisfies Command
