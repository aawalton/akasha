import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const badgeKeying = {
  id: "01a0ca57-6b79-7ed9-8595-bf983f190063",
  type: "page-type/module",
  slug: "badge-keying",
  definition: "the key one badge of a list carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is the item's place in the list joined to what that item holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key takes the opening of what an item holds rather than the whole of it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No key here is an id a page keeps.",
    },
  ],
} as const satisfies Module
