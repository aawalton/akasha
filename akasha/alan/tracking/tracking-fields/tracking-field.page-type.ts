import type { PageProperty } from "@akasha/pages-system/page-property"
import type { PageType } from "@akasha/pages-system/page-type"

export type TrackingField = PageProperty

export const trackingField = {
  id: "01a06827-ec0c-79f7-864d-da0cf491975e",
  pageTypeSlug: "page-type",
  slug: "tracking-field",
  definition: "one aspect of Alan that takes a value each time it is observed",
  pluralSlug: "tracking-fields",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field is observed rather than set, so each value it holds is one observation.",
    },
    {
      invariantKind: "gap",
      statement:
        "How a field's values come to exist is a capture the field names, and no property here declares that yet.",
    },
  ],
} as const satisfies PageType
