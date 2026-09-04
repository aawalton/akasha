import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ValueColorSlug = Slug

export const valueColorSlug = {
  id: "01a06d7a-e9f7-7f1b-b0c4-15f3742e8352",
  pageTypeSlug: "relation-property",
  slug: "value-color-slug",
  propertySlug: "color-slug",
  definition: "the color a value is always drawn in",
  targetPageTypeSlug: "page-type/color",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is drawn in this color whatever a reading against that value says.",
    },
  ],
} as const satisfies RelationProperty
