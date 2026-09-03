import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../collections/collection.page-type.ts"
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
  slug: "collection-external",
  definition: "a collection a provider outside akasha is the record of",
  pluralSlug: "collection-externals",
  partSlugs: [
    "calendar-date-property/last-synced-at",
    "text-property/external-id",
    "text-property/source",
    "url-property/external-link",
  ],
  extendsSlug: "page-type/collection",
  properties: [
    { pagePropertySlug: "external-id", required: false, many: false },
    { pagePropertySlug: "external-link", required: false, many: false },
    { pagePropertySlug: "source", required: false, many: false },
    { pagePropertySlug: "last-synced-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the provider does not answer with is left as the field was.",
    },
    {
      invariantKind: "departure",
      statement: "What a person records about a collection outlives every sync.",
    },
    {
      invariantKind: "departure",
      statement: "A provider that answered with no id leaves the collection stating none.",
    },
    {
      invariantKind: "departure",
      statement: "A collection never synced states no moment it was synced at.",
    },
  ],
} as const satisfies PageType
