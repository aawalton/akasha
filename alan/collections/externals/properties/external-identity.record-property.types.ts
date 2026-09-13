import type { ExternalId } from "akasha/alan/collections/externals/properties/external-id.text-property.types.ts"
import type { ExternalLink } from "akasha/alan/collections/externals/properties/external-link.url-property.types.ts"
import type { LastSyncedAt } from "akasha/alan/collections/externals/properties/last-synced-at.calendar-date-property.types.ts"
import type { Source } from "akasha/alan/collections/externals/properties/source.select-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type ExternalIdentity = List<{
  source: Source
  externalId?: ExternalId
  externalLink?: ExternalLink
  lastSyncedAt?: LastSyncedAt
}>
