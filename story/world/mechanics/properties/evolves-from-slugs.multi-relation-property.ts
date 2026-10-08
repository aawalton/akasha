import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const evolvesFromSlugs = {
  id: "01a0655d-ac15-7900-8205-60508a002f32",
  type: "page-type/multi-relation-property",
  slug: "evolves-from-slugs",
  propertySlug: "evolves-from-slugs",
  definition: "every mechanic evolving into this one",
  targetPageType: "page-type/world-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An evolution names a mechanic of the kind the mechanic evolving is.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:43:52.853Z",
  updatedAt: "2026-09-22T18:27:19.000Z",
} as const satisfies MultiRelationProperty
