import type { Command } from "@akasha/command-system/command"

export const smsActingAccount = {
  id: "01a0685f-c8ed-7007-a130-cda36891535f",
  pageTypeSlug: "command",
  slug: "sms-acting-account",
  definition: "the command reading the write-as account out of a delivered SMS surface's footer",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--surface-file <path|->",
      takes: "the delivered surface to read, or `-` for the input",
    },
  ],
  helpNotes: [
    "this is the one sanctioned source of a handler's write-as identity, so nothing else works it out.",
    "the id is read off the footer the server stamped, anchored on the last inbound marker in the surface.",
    "an id forged anywhere in the body of the message is therefore never answered.",
    "a surface carrying no trusted footer refuses and answers nothing, so the handler writes as nobody.",
    "the answer is the identity alone, on a line of its own.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The identity is read off the last server-stamped footer rather than the body.",
    },
    {
      invariantKind: "departure",
      statement: "A surface carrying no trusted footer refuses rather than answering empty.",
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
} as const satisfies Command
