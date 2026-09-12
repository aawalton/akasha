import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageSend = {
  id: "01a0685f-c8ed-7004-8926-65ffc06d2862",
  type: "command",
  slug: "imessage-send",
  definition: "the command handing one message to the Messages app on the mac",
  code: "ts",
  taking: [
    {
      said: "--to <name-or-handle>",
      takes: "who the message goes to, as a phone number, an address, or an address book name",
    },
    {
      said: "<name-or-handle>",
      takes: "the same recipient, said as a word rather than at its flag",
    },
    { said: "--text <body>", takes: "the message body" },
    { said: "--text-file <path>", takes: "a file the body is read from, or `-` for the input" },
    { said: "--image <path>", takes: "a file hung off the message, ten megabytes at most" },
    { said: "--json", takes: "give what was sent as JSON rather than as the sent line" },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No message is taken back once that message is sent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A recipient that looks like a number or an address is used rather than looked up.",
    },
    {
      invariantKind: "departure",
      statement: "A name landing on nobody or on more than one person is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A person's first phone number is preferred over their first address.",
    },
    {
      invariantKind: "departure",
      statement: "Saying neither a body nor a picture is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A picture past ten megabytes is refused before anything is sent.",
    },
    {
      invariantKind: "departure",
      statement: "A picture is read off the disk before the recipient is looked up.",
    },
    {
      invariantKind: "departure",
      statement: "A body read from a file has no closing line ending.",
    },
  ],
  name: "send",
} as const satisfies Command
