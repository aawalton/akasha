import type { Command } from "@akasha/command-system/command"

export const imessageSearch = {
  id: "01a0685f-c8ed-7003-b10c-862bb54dd76a",
  pageTypeSlug: "command",
  slug: "imessage-search",
  definition: "the command giving back the messages whose text holds a run of characters",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--query <text>", takes: "the run of characters a message's text must hold" },
    { said: "<text>", takes: "the same run, said as a word rather than at its flag" },
    { said: "--query-file <path>", takes: "a file the run is read from, or `-` for the input" },
    {
      said: "--contact <name-or-handle>",
      takes: "hold the answer to the conversations of the one contact named",
    },
    { said: "--limit <n>", takes: "the most matches given back, twenty where none is said" },
    { said: "--tail <n>", takes: "the same thing said the other way" },
    { said: "--json", takes: "give the messages as JSON rather than as tab-parted rows" },
  ],
  helpNotes: [
    "the text of almost every row is empty and is decoded from the typedstream body beside it instead.",
    "the store is asked for five times the limit and the decoded texts are then matched again.",
    "the match the store makes is over raw bytes and minds the case; the match made after it does not.",
    "so a mixed-case hit of a lower-case run can be missed, and none is ever falsely answered.",
    "the rows are answered oldest first, the same way `imessage recent` answers.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The store is over-asked and the answer is narrowed against the decoded text.",
    },
    {
      invariantKind: "departure",
      statement: "The match the store makes minds the case and the match made after it does not.",
    },
    {
      invariantKind: "departure",
      statement: "The newest matches win where more match than the limit allows.",
    },
    {
      invariantKind: "departure",
      statement: "A run of characters read from a file carries no closing line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A contact matching nobody refuses rather than answering empty.",
    },
  ],
} as const satisfies Command
