import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageSearch = {
  id: "01a0685f-c8ed-7003-b10c-862bb54dd76a",
  type: "command",
  slug: "imessage-search",
  definition: "the command giving back the messages whose text has a run of characters",
  code: "ts",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "The messages are answered oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "The store is over-asked and the answer is narrowed against the decoded text.",
    },
    {
      invariantKind: "departure",
      statement:
        "The match the store makes minds the case and the match made after that match does not.",
    },
    {
      invariantKind: "departure",
      statement: "The newest matches win where more match than the limit allows.",
    },
    {
      invariantKind: "departure",
      statement: "A run of characters read from a file has no closing line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A contact matching nobody refuses rather than answering empty.",
    },
  ],
  name: "search",
} as const satisfies Command
