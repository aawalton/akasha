import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentForestReading = {
  id: "01a0686b-bfe9-730e-819c-87f392b2783e",
  pageTypeSlug: "module",
  slug: "agent-forest-reading",
  definition: "one reading of the whole fleet, and the count of seats that reading lost",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's subagents are folded out of that seat's own transcript.",
    },
    {
      invariantKind: "departure",
      statement: "Every live seat is read at once rather than one after another.",
    },
    {
      invariantKind: "departure",
      statement: "A live seat no transcript is named for is counted as unread.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose fold threw is counted as unread.",
    },
    {
      invariantKind: "departure",
      statement: "The count of unread seats is carried out rather than swallowed.",
    },
    {
      invariantKind: "departure",
      statement: "The reasons are sorted and the first of those reasons is named.",
    },
    {
      invariantKind: "departure",
      statement: "The working turn's color is given to this reading rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "A reading given no turn color leaves every subagent with no color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here hangs one row under another.",
    },
  ],
} as const satisfies Module
