import type { Module } from "@akasha/code-system/module"

export const seatPageValues = {
  id: "01a06949-b281-7930-babe-566948d7b200",
  pageTypeSlug: "module",
  slug: "seat-page-values",
  definition: "what a seat states now, read from akasha's page for it and from nowhere else",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's values come from akasha, with no fallback to the older store.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent with no values of its own is read from the seat above it.",
    },
    {
      invariantKind: "departure",
      statement: "The seat above a subagent is found by splitting its id, not by opening a file.",
    },
    {
      invariantKind: "departure",
      statement: "An empty text value reads as nothing rather than as an empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A number held on the page is answered as its text.",
    },
    {
      invariantKind: "departure",
      statement: "A value is a flag only where the page holds exactly true.",
    },
  ],
} as const satisfies Module
