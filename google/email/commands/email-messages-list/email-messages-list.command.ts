import type { Command } from "@akasha/command-system/command"

export const emailMessagesList = {
  id: "01a06810-cf11-7ea4-b544-6691871388cf",
  pageTypeSlug: "command",
  slug: "email-messages-list",
  definition: "the command summarising each Gmail message a search matches, the search optional",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--query <text>", takes: "Gmail search syntax a listing is matched against" },
    { said: "--query-file <path>", takes: "a file the search is read from, or `-` for the input" },
    { said: "--max <n>", takes: "how many messages to answer with at most" },
    { said: "--label <id>", takes: "a label id a listing is held to, said again for each" },
  ],
  helpNotes: [
    "the search is Gmail's own syntax, so `from:`, `subject:`, `newer_than:7d` and `has:attachment` all hold.",
    "a listing naming no search matches every message.",
    "a summary carries the id, the thread, from, to, subject, date and the snippet.",
    "a search too awkward to say in a shell is read from a file, or from standard input at `-`.",
  ],
  invariants: [
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
      statement: "A search read from a file carries no line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A listing fetches each message's headers one message at a time.",
    },
  ],
} as const satisfies Command
