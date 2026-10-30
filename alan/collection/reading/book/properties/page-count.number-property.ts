import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const pageCount = {
  id: "01a06741-dd0f-7005-b740-1e4345152777",
  type: "page-type/number-property",
  slug: "page-count",
  propertySlug: "page-count",
  definition: "the number of pages in an edition",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page count is the edition's rather than the book's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No length counted in words is read off a page count.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T12:32:44.815Z",
  updatedAt: "2026-10-30T16:21:12.013Z",
} as const satisfies NumberProperty
