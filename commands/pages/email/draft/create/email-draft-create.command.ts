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
    {
      invariantKind: "departure",
      statement: "Every draft names a subject here or at `--subject-file`.",
    },
    { invariantKind: "departure", statement: "Every draft names a body here or at `--body-file`." },
  ],
  name: "create",
  arguments: [
    { argument: "argument/subject-file" },
    { argument: "argument/body-file" },
    { argument: "argument/bcc" },
    { argument: "argument/subject" },
    { argument: "argument/body" },
    { argument: "argument/attach" },
    { argument: "argument/thread" },
    { argument: "argument/reply-to-message" },
    { argument: "argument/send-as" },
    { argument: "argument/cc", repeats: true },
  ],
} as const satisfies Command
