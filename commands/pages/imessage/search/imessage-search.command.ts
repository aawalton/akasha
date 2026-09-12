import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageSearch = {
  id: "01a0685f-c8ed-7003-b10c-862bb54dd76a",
  type: "command",
  slug: "imessage-search",
  definition: "the command giving back the messages whose text has a run of characters",
  code: "ts",
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
    { invariantKind: "departure", statement: "A call saying no limit gives back twenty matches." },
  ],
  name: "search",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/query-file", notWith: ["argument/message-query"] },
    { argument: "argument/message-query", saidAs: "flag-or-word" },
    { argument: "argument/contact" },
    { argument: "argument/limit" },
  ],
} as const satisfies Command
