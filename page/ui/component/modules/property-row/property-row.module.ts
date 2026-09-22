import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyRow = {
  id: "01a0a0d2-ad9f-7cf3-a201-b2c2690423c7",
  type: "page-type/module",
  slug: "property-row",
  definition:
    "the row a property is shown as, its label with its value, drawn by the page type declaring it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property no page type above it draws takes the row beside page-property.",
    },
  ],
} as const satisfies Module
