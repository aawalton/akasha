import type { Command } from "@akasha/command-system/command"

export const imessageContacts = {
  id: "01a0685f-c8ed-7001-8968-6b6c199596e3",
  pageTypeSlug: "command",
  slug: "imessage-contacts",
  definition: "the command naming the address book contacts whose name holds a run of letters",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--query <name>", takes: "the run of letters a contact's name must hold" },
    { said: "<name>", takes: "the same run of letters, said as a word rather than at its flag" },
    { said: "--json", takes: "give the contacts as JSON rather than as tab-parted rows" },
  ],
  helpNotes: [
    "the address book is read off the mac, every source of it merged into one contact for a person.",
    "the run of letters is matched against a first name, a last name and an organization alike, whatever the case.",
    "a row carries the name, then the phone numbers parted by commas, then the addresses.",
    "matching nothing is an empty answer rather than a refusal.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is matched whatever the case it was said in.",
    },
    {
      invariantKind: "departure",
      statement: "A run of letters standing anywhere in the name matches.",
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
} as const satisfies Command
