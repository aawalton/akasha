import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiCollectionTemplate = {
  id: "01a06825-d0ec-7fb0-9159-d7bc2e559c43",
  type: "page-type/page-type",
  slug: "ki-collection-template",
  definition: "a collection of Ki's, held apart from Alan's",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type of Ki's is under this page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page type has a collection of Ki's beside a collection of Alan's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ki scores a collection with a number and grades that collection with a letter.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
