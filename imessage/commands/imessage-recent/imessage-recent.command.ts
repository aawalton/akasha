import type { Command } from "@akasha/command-system/command"

export const imessageRecent = {
  id: "01a0685f-c8ed-7002-acaf-64c6ea2ab792",
  pageTypeSlug: "command",
  slug: "imessage-recent",
  definition: "the command giving back the newest messages in the mac's message store",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--limit <n>", takes: "the most messages given back, twenty where none is said" },
    { said: "--tail <n>", takes: "the same thing said the other way" },
    {
      said: "--contact <name-or-handle>",
      takes: "hold the answer to the conversations of the one contact named",
    },
    { said: "--json", takes: "give the messages as JSON rather than as tab-parted rows" },
  ],
  helpNotes: [
    "the newest messages are found first and then answered oldest first, so the last row is the newest.",
    "a contact is named by an address book name, a phone number or an address alike.",
    "a row carries the moment, the way the message went, who it was with, and the text.",
    "a moment is written in the reader's own timezone rather than in UTC.",
    "a contact matching nobody is a data refusal rather than an empty answer.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The newest messages are taken and then answered oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A contact holds the answer to every conversation that contact stands in.",
    },
    {
      invariantKind: "departure",
      statement: "A contact matching nobody refuses rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement: "A limit of zero is refused rather than read as no limit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here searches the text of a message.",
    },
  ],
} as const satisfies Command
