import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tributeCatalog = {
  id: "01a0604d-23a2-77c4-a80a-b77a49b0dad8",
  type: "page-type/module",
  slug: "tribute-catalog",
  definition: "the Tales of Tribute patrons the game lists and the cards each patron brings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A patron has the cards that patron gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card names its base form and its upgraded form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level is checked against a zod schema in this module's test.",
    },
  ],
} as const satisfies Module
