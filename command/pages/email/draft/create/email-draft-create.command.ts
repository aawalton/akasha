import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailDraftCreate = {
  id: "01a06810-cf11-70dc-9875-5c649a88fe59",
  type: "command",
  slug: "email-draft-create",
  definition: "the command writing one Gmail draft from the flags a send takes, unsent",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft is composed from the flags a send is composed from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject or a body said both inline and in a file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`-` names standard input for one flag at most.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draft comes back as its own id, its message's id and that message's thread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A create that threw after Gmail took the draft says Gmail holds it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends the draft.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a draft back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every draft names a subject here or at `--subject-file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every draft names a body here or at `--body-file`.",
    },
  ],
  name: "create",
  arguments: [
    { argument: "argument/to-address", required: true, repeats: true },
    {
      argument: "argument/subject-file",
      notWith: ["argument/subject"],
      oneOf: ["argument/subject"],
    },
    { argument: "argument/body-file", notWith: ["argument/body"], oneOf: ["argument/body"] },
    { argument: "argument/subject" },
    { argument: "argument/body" },
    { argument: "argument/thread" },
    { argument: "argument/reply-to-message" },
    { argument: "argument/send-as" },
    { argument: "argument/cc", repeats: true },
    { argument: "argument/bcc", repeats: true },
    { argument: "argument/attach", repeats: true },
  ],
} as const satisfies Command
