import type { Collection } from "../collection.page-type.types.ts"
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
