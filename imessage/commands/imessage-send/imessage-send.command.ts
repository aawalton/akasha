import type { Command } from "@akasha/command-system/command"

export const imessageSend = {
  id: "01a0685f-c8ed-7004-8926-65ffc06d2862",
  pageTypeSlug: "command",
  slug: "imessage-send",
  definition: "the command handing one message to the Messages app on the mac",
  code: "ts",
  changeKindSlug: "change-none",
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
    { said: "--attachment <path>", takes: "the same thing said the other way" },
    { said: "--json", takes: "give what was sent as JSON rather than as the sent line" },
  ],
  helpNotes: [
    "a body, a picture, or both is said; saying neither is refused.",
    "a name is looked up in the address book and must land on exactly one person.",
    "that person's first phone number is used, and their first address where they have no number.",
    "a phone number or an address is taken as said rather than looked up.",
    "the picture is read off the disk and carried to the mac before the message is handed over.",
    "a message once sent is not taken back.",
  ],
  invariants: [
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
      statement: "A body read from a file carries no closing line ending.",
    },
  ],
} as const satisfies Command
