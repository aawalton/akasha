import type { Command } from "../../../../command.page-type.ts"

export const emailAttachmentsGet = {
  id: "01a06810-cf11-75ef-84b0-74beeb5d5383",
  pageTypeSlug: "command",
  type: "command",
  slug: "email-attachments-get",
  definition: "the command fetching one attachment's bytes by id, with its size beside them",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the message the attachment hangs off, said as Gmail's own id" },
    { said: "--message <id>", takes: "that message, where no id follows the command" },
    { said: "--attachment-id <id>", takes: "which attachment of that message to fetch" },
  ],
  helpNotes: [
    "an attachment id is learned from `email attachments list`, which names one for each attachment a message carries.",
    "the bytes come back base64url-encoded under `data`, with `size` beside them.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An attachment is reached by its own id rather than by where that attachment sits.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes are answered base64url-encoded with their size beside those bytes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the bytes to a file.",
    },
  ],
} as const satisfies Command
