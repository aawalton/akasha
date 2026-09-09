import type { PageProperty } from "@akasha/pages/page-property"
import type { PageType } from "@akasha/pages/page-type"

export type TrackingField = PageProperty

export const trackingField = {
  id: "01a06827-ec0c-79f7-864d-da0cf491975e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "tracking-field",
  definition: "one aspect of Alan that takes a value each time it is observed",
  pluralSlug: "tracking-fields",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field is observed rather than set.",
    },
    {
      invariantKind: "departure",
      statement: "Each value a field has is one observation.",
    },
    {
      invariantKind: "gap",
      statement: "How a field's values come to exist is a capture the field names.",
    },
    {
      invariantKind: "absence",
      statement: "No property here declares the capture a field names.",
    },
  ],
} as const satisfies PageType
