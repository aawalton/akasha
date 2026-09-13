import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const collectionExternal = {
  id: "01a063de-2c60-701b-ab74-7e3436f4abe3",
  type: "page-type",
  slug: "collection-external",
  definition: "a collection a provider outside akasha is the record of",
  pluralSlug: "collection-externals",
  parts: [
    "calendar-date-property/last-synced-at",
    "module/external-identity-reading",
    "record-property/external-identity",
    "select-property/source",
    "text-property/external-id",
    "url-property/external-link",
  ],
  extends: ["page-type/collection"],
  properties: [
    {
      pageProperty: "record-property/external-identity",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the provider does not answer with is left as the field was.",
    },
    {
      invariantKind: "departure",
      statement: "The values a person records about a collection outlive every sync.",
    },
    {
      invariantKind: "departure",
      statement: "A provider that answered with no id leaves the collection stating no id.",
    },
    {
      invariantKind: "departure",
      statement: "A collection never synced states no moment that collection was synced at.",
    },
  ],
  types: "ts",
} as const satisfies PageType
