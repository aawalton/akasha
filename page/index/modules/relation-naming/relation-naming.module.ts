import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relationNaming = {
  id: "01a17f5e-0968-7cc4-b7d3-b10adf0b8dd3",
  type: "page-type/module",
  slug: "relation-naming",
  definition: "the names a page states under its relations, each with the property stating it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is answered only where the property it reaches declares a target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key whose slug two kinds of property share is held to the one the page's own type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record property's fields are answered one by one under that record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's fields are answered under the entry shape the row is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's `id` and `slug` and `type` are answered as that page's identity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a caller answers a naming being an identity is that caller's own.",
    },
  ],
  createdAt: "2026-10-27T21:57:11.656Z",
  updatedAt: "2026-10-27T22:26:15.850Z",
} as const satisfies Module
