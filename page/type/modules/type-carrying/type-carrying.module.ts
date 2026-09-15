import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeCarrying = {
  id: "01a0a2b4-aded-7167-889b-86d7006f7237",
  type: "module",
  slug: "type-carrying",
  definition: "what a page type carries, as the file beside that page type holds it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line carries the property worked out whole, so a reader reads no second page.",
    },
    {
      invariantKind: "departure",
      statement: "A line says what the declaration says and what the property's own page says.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are sorted, so a property that changes moves one line.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carrying no property has a body with no line.",
    },
    {
      invariantKind: "departure",
      statement: "A line written here and a line read back here are the same property.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
