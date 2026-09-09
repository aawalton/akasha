import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ValueColor = Slug

export const valueColor = {
  id: "01a06d7a-e9f7-7f1b-b0c4-15f3742e8352",
  pageTypeSlug: "relation-property",
  slug: "value-color",
  propertySlug: "color",
  definition: "the color a value is always drawn in",
  targetPageType: "page-type/color",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is drawn in this color whatever a reading against that value says.",
    },
  ],
} as const satisfies RelationProperty
