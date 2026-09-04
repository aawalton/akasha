import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatPage = {
  id: "01a064d3-f9f9-72b6-a771-f619d8e15773",
  pageTypeSlug: "module",
  slug: "seat-page",
  definition: "the agent id each named seat carries and the names of the seats that are there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is read from the akasha index rather than from the seat's own file.",
    },
    {
      invariantKind: "departure",
      statement: "The index holds a seat's agent id against the name the seat sits under.",
    },
    {
      invariantKind: "departure",
      statement: "A name naming no seat is left out of the answer rather than answered as empty.",
    },
    {
      invariantKind: "stopgap",
      statement: "An answer here is a promise though nothing here waits.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a seat's file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses frontmatter.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a seat.",
    },
  ],
} as const satisfies Module
