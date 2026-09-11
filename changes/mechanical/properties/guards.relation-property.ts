import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const guards = {
  id: "01a07744-1311-7388-8533-715d6c538707",
  type: "relation-property",
  slug: "guards",
  propertySlug: "guards",
  definition: "a guard that runs on the answer a change gives",
  targetPageType: "page-type/change-guard",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change naming no guard and reaching no change is judged by no guard.",
    },
    {
      invariantKind: "departure",
      statement: "A change composed of other changes inherits the guards the changes reached name.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
