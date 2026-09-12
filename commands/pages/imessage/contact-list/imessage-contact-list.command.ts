import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageContactList = {
  id: "01a0685f-c8ed-7001-8968-6b6c199596e3",
  type: "command",
  slug: "imessage-contact-list",
  definition: "the command naming the address book contacts whose name has a run of letters",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row carries the name, then the phone numbers parted by commas, then the addresses.",
    },
    {
      invariantKind: "departure",
      statement: "A name is matched whatever the case that name was said in.",
    },
    {
      invariantKind: "departure",
      statement: "A run of letters anywhere in the name matches.",
    },
    {
      invariantKind: "departure",
      statement: "One person held in several address book sources is answered once.",
    },
    {
      invariantKind: "departure",
      statement: "Matching nothing is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a message.",
    },
  ],
  name: "contact-list",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/contact-query", required: true, saidAs: "flag-or-word" },
  ],
} as const satisfies Command
