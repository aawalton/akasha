import type { PageType } from "@akasha/pages/page-type"

export const locationCollection = {
  id: "01a06589-d12e-7daf-abd1-8fb5c89e9127",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "location-collection",
  definition: "places gathered under one name",
  pluralSlug: "location-collections",
  extends: ["page-type/page"],
  parts: ["file-property/location-collection-description"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "file-property/location-collection-description",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection lists no place of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A place names the collection that place is in.",
    },
  ],
  types: "ts",
} as const satisfies PageType
