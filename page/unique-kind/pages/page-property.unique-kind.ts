import type { UniqueKind } from "akasha/page/unique-kind/unique-kind.page-type.types.ts"

export const pageProperty = {
  id: "01a0814f-68bb-7000-878e-605b3d7dec8b",
  type: "page-type/unique-kind",
  slug: "page-property",
  definition: "the value is unique among the pages with one value of a property",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The property scoping the value is named under `uniqueProperty`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That property is declared on the same page type and is required and has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope a page is filed under is the value that property has.",
    },
  ],
  createdAt: "2026-09-08T13:57:40.155Z",
  updatedAt: "2026-09-22T10:19:56.000Z",
} as const satisfies UniqueKind
