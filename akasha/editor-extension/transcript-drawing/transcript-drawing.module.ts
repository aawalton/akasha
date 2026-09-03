import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptDrawing = {
  id: "01a06811-01d3-7002-bee9-dca9b509d3d2",
  pageTypeSlug: "module",
  slug: "transcript-drawing",
  definition: "the html a transcript's entries are drawn as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every value drawn is escaped.",
    },
    {
      invariantKind: "departure",
      statement: "A result past the character limit is clipped.",
    },
    {
      invariantKind: "departure",
      statement: "A clipped result says how many characters are not shown.",
    },
    {
      invariantKind: "departure",
      statement: "A tool call with no result is drawn as pending.",
    },
    {
      invariantKind: "departure",
      statement: "A tool call that failed is marked as failed.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent transcript is drawn inside the call that started it.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent nested past the depth limit is said to be too deep.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent the reader has not read is said to be unread.",
    },
    {
      invariantKind: "departure",
      statement: "A disclosure carries the id of the call it draws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
