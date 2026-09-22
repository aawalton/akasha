import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiBook = {
  id: "01a06825-d0ec-7364-85c4-e2b19f12133e",
  type: "page-type/page-type",
  slug: "ki-book",
  definition: "an edition of a book Ki keeps",
  extends: ["page-type/ki-collection-template"],
  parts: [],
  properties: [
    { pageProperty: "text-property/isbn", required: false, many: false },
    { pageProperty: "text-property/isbn13", required: false, many: false },
    { pageProperty: "text-property/publisher", required: false, many: false },
    { pageProperty: "number-property/original-publication-year", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of Ki's names the one author credited first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of Ki's names everyone else credited with writing the book.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
