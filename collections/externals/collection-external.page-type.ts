import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../collection.page-type.ts"
import type { ExternalId } from "./properties/external-id.text-property.ts"
import type { ExternalLink } from "./properties/external-link.url-property.ts"
import type { LastSyncedAt } from "./properties/last-synced-at.calendar-date-property.ts"
import type { Source } from "./properties/source.text-property.ts"

export type CollectionExternal = Collection & {
  externalId?: ExternalId
  externalLink?: ExternalLink
  source?: Source
  lastSyncedAt?: LastSyncedAt
}

export const collectionExternal = {
  id: "01a063de-2c60-701b-ab74-7e3436f4abe3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "collection-external",
  definition: "a collection a provider outside akasha is the record of",
  pluralSlug: "collection-externals",
  parts: [
    "calendar-date-property/last-synced-at",
    "text-property/external-id",
    "text-property/source",
    "url-property/external-link",
  ],
  extends: ["page-type/collection"],
  properties: [
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "url-property/external-link", required: false, many: false },
    { pageProperty: "text-property/source", required: false, many: false },
    { pageProperty: "calendar-date-property/last-synced-at", required: false, many: false },
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
} as const satisfies PageType
