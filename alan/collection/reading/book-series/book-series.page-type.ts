import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const bookSeries = {
  id: "01a06598-222b-7003-beee-2001c8924b27",
  type: "page-type/page-type",
  slug: "book-series",
  definition: "a series of books Alan reads",
  extends: ["page-type/collection-external"],
  parts: ["select-property/maturity-rating"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/maturity-rating", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A series has books alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The books a series has are the books naming that series.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A series Alan has not graded states no rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A series opening its name with a number is slugged for its page type first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:47:44.171Z",
  updatedAt: "2026-10-30T16:34:19.999Z",
} as const satisfies PageType
