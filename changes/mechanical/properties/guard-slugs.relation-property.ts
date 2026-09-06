import type { Slug } from "../../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages/relation-properties/relation-property.page-type.ts"

export type GuardSlugs = Slug

export const guardSlugs = {
  id: "01a07744-1311-7388-8533-715d6c538707",
  pageTypeSlug: "relation-property",
  slug: "guard-slugs",
  propertySlug: "guard-slugs",
  definition: "a guard that runs on the answer a change gives",
  targetPageTypeSlug: "page-type/change-guard",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change naming no guard is judged by no guard.",
    },
    {
      invariantKind: "departure",
      statement: "A change composed of other changes names the guards that change alone needs.",
    },
  ],
} as const satisfies RelationProperty
