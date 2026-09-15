import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { ExternalLink } from "akasha/alan/collection/external/properties/external-link.url-property.types.ts"
import type { LastSyncedAt } from "akasha/alan/collection/external/properties/last-synced-at.calendar-date-property.types.ts"
import type { Source } from "akasha/alan/collection/external/properties/source.select-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ExternalIdentity = List<{
  source: Source
  externalId?: ExternalId
  externalLink?: ExternalLink
  lastSyncedAt?: LastSyncedAt
}>
