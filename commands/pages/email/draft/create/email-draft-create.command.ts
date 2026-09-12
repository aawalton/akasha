import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailDraftCreate = {
  id: "01a06810-cf11-70dc-9875-5c649a88fe59",
  type: "command",
  slug: "email-draft-create",
  definition: "the command writing one Gmail draft from the flags a send takes, unsent",
  code: "ts",
  taking: [
    {
      said: "--to <addr,..>",
      takes: "who the mail goes to, said again or parted by commas, and every draft names one",
    },
    { said: "--cc <addr,..>", takes: "who is copied, said again or parted by commas" },
    { said: "--bcc <addr,..>", takes: "who is blind copied, said again or parted by commas" },
    {
      said: "--subject <text>",
      takes: "the subject line, which every draft names here or at `--subject-file`",
    },
    {
      said: "--body <text>",
      takes: "the plain-text body, which every draft names here or at `--body-file`",
    },
    { said: "--attach <path>", takes: "a file to hang off the mail, said again for each" },
    { said: "--thread <id>", takes: "the thread the message joins" },
    {
      said: "--reply-to-message <id>",
      takes: "the message whose id seeds In-Reply-To and References",
    },
    { said: '--from <"Name <addr>">', takes: "a verified send-as alias to send the mail from" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is composed from the flags a send is composed from.",
    },
    {
      invariantKind: "departure",
      statement: "A subject or a body said both inline and in a file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`-` names standard input for one flag at most.",
    },
    {
      invariantKind: "departure",
      statement: "A draft comes back as its own id, its message's id and that message's thread.",
    },
    {
      invariantKind: "departure",
      statement: "A create that threw after Gmail took the draft says Gmail holds it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends the draft.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a draft back.",
    },
  ],
  name: "create",
  arguments: [{ argument: "argument/subject-file" }, { argument: "argument/body-file" }],
} as const satisfies Command
