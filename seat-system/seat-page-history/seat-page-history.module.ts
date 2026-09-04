import type { Module } from "@akasha/code-system/module"

export const seatPageHistory = {
  id: "01a06949-b281-73d6-bbcd-230e36f15701",
  pageTypeSlug: "module",
  slug: "seat-page-history",
  definition: "what a seat last said before its page went, read from akasha's history alone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a seat said before is read from akasha's history and from no older store.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute recovered from history is the bare slug after the last slash.",
    },
    {
      invariantKind: "departure",
      statement: "The assignment is also kept whole, so the page type it names is not lost.",
    },
    {
      invariantKind: "departure",
      statement: "The initiative is taken from its own field rather than from the attributes.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is answered only where the id on the page matches the agent asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with a parent but no person named takes the fleet as its principal.",
    },
  ],
} as const satisfies Module
