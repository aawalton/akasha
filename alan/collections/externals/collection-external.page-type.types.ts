import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.ts"
import type { ExternalLink } from "akasha/alan/collections/externals/properties/external-link.url-property.types.ts"
import type { LastSyncedAt } from "akasha/alan/collections/externals/properties/last-synced-at.calendar-date-property.types.ts"
import type { Source } from "akasha/alan/collections/externals/properties/source.select-property.ts"

export type CollectionExternal = Collection & {
  externalId?: ExternalId
  externalLink?: ExternalLink
  source?: Source
  lastSyncedAt?: LastSyncedAt
}
