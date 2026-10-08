import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const nameFormat = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  type: "page-type/relation-property",
  slug: "name-format",
  propertySlug: "name-format",
  definition: "a text value's format",
  nullable: true,
  targetPageType: "page-type/name-format",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page held to no format states null rather than nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-28T18:54:50.220Z",
  updatedAt: "2026-09-22T13:46:01.000Z",
} as const satisfies RelationProperty
