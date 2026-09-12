import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailAttachmentShow = {
  id: "01a06810-cf11-75ef-84b0-74beeb5d5383",
  type: "command",
  slug: "email-attachment-show",
  definition: "the command fetching one attachment's bytes by id, with its size beside them",
  code: "ts",
  test: "ts",
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
  name: "show",
  arguments: [
    { argument: "argument/message", required: true, saidAs: "flag-or-word" },
    { argument: "argument/attachment-id", required: true },
  ],
} as const satisfies Command
