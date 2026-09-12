import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageList = {
  id: "01a06810-cf11-7ea4-b544-6691871388cf",
  type: "command",
  slug: "email-message-list",
  definition: "the command summarising each Gmail message a search matches, the search optional",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A summary carries the id, the thread, from, to, subject, date and the snippet.",
    },
    {
      invariantKind: "departure",
      statement: "A listing naming no search matches every message.",
    },
    {
      invariantKind: "departure",
      statement: "A summary is read from headers rather than from a body.",
    },
    {
      invariantKind: "departure",
      statement: "A search read from a file has no line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A listing fetches each message's headers one message at a time.",
    },
  ],
  name: "list",
  arguments: [
    { argument: "argument/query-file", notWith: ["argument/mail-query"] },
    { argument: "argument/mail-query" },
    { argument: "argument/max" },
    { argument: "argument/label", repeats: true },
  ],
} as const satisfies Command
