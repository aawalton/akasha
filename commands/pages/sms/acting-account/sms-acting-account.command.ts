import type { Command } from "akasha/commands/command.page-type.types.ts"

export const smsActingAccount = {
  id: "01a0685f-c8ed-7007-a130-cda36891535f",
  type: "command",
  slug: "sms-acting-account",
  definition: "the command reading the write-as account out of a delivered SMS surface's footer",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--surface-file <path|->",
      takes: "the delivered surface to read, or `-` for the input",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A handler's write-as account is read here rather than worked out anywhere else.",
    },
    {
      invariantKind: "departure",
      statement: "The identity is read off the last server-stamped footer rather than the body.",
    },
    {
      invariantKind: "departure",
      statement: "A surface with no trusted footer refuses rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the identity alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether the identity may write anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the carrier.",
    },
  ],
  name: "acting-account",
} as const satisfies Command
