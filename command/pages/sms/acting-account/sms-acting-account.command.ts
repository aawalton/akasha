import type { Command } from "akasha/command/command.page-type.types.ts"

export const smsActingAccount = {
  id: "01a0685f-c8ed-7007-a130-cda36891535f",
  type: "command",
  slug: "sms-acting-account",
  definition: "the command reading the write-as account out of a delivered SMS surface's footer",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A handler's write-as account is read here rather than worked out anywhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identity is read off the last server-stamped footer rather than the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surface with no trusted footer refuses rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer is the identity alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether the identity may write anything.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the carrier.",
    },
  ],
  name: "acting-account",
  arguments: [{ argument: "argument/surface-file", required: true }],
} as const satisfies Command
