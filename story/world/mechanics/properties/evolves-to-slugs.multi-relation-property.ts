import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const evolvesToSlugs = {
  id: "01a0655d-ac15-78e3-a569-51e32648b88c",
  type: "page-type/multi-relation-property",
  slug: "evolves-to-slugs",
  propertySlug: "evolves-to-slugs",
  definition: "every mechanic this one reaches",
  targetPageType: "page-type/world-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An evolution names a mechanic of the kind the mechanic evolving is.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
