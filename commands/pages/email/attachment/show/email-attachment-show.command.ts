import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailAttachmentShow = {
  id: "01a06810-cf11-75ef-84b0-74beeb5d5383",
  type: "command",
  slug: "email-attachment-show",
  definition: "the command fetching one attachment's bytes by id, with its size beside them",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the message the attachment hangs off, said as Gmail's own id" },
    { said: "--message <id>", takes: "that message, where no id follows the command" },
    {
      said: "--attachment-id <id>",
      takes: "which attachment to fetch, said as `email attachment list` names it",
    },
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
