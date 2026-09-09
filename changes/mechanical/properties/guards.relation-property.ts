import type { Slug } from "../../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages/relation-properties/relation-property.page-type.ts"

export type Guards = Slug

export const guards = {
  id: "01a07744-1311-7388-8533-715d6c538707",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "guards",
  propertySlug: "guards",
  definition: "a guard that runs on the answer a change gives",
  targetPageType: "page-type/change-guard",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change naming no guard and reaching none is judged by no guard.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change composed of other changes inherits the guards the changes it reaches name.",
    },
  ],
} as const satisfies RelationProperty
