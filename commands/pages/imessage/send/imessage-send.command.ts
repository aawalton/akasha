import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageSend = {
  id: "01a0685f-c8ed-7004-8926-65ffc06d2862",
  type: "command",
  slug: "imessage-send",
  definition: "the command handing one message to the Messages app on the mac",
  code: "ts",
  test: "ts",
  taking: [
    {
      said: "--to <name-or-handle>",
      takes: "who the message goes to, as a phone number, an address, or an address book name",
    },
    {
      said: "<name-or-handle>",
      takes: "the same recipient, said as a word rather than at its flag",
    },
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
    { invariantKind: "departure", statement: "A picture a call names is hung off the message." },
    {
      invariantKind: "departure",
      statement: "A send that landed is named as soon as the script on the mac says so.",
    },
    {
      invariantKind: "departure",
      statement: "A picture that failed after the text names that text in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The lines the mac answers are handed in.",
    },
  ],
  name: "send",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/text-file" },
    { argument: "argument/text" },
    { argument: "argument/image" },
  ],
} as const satisfies Command
