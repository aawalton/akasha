import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { ExternalLink } from "akasha/alan/collection/external/properties/external-link.url-property.types.ts"
import type { Position } from "akasha/alan/collection/properties/position.number-property.types.ts"
import type { DiscNumber } from "akasha/alan/music/catalog/track/properties/disc-number.number-property.types.ts"
import type { Release } from "akasha/alan/music/catalog/track/properties/release.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type CarriedBy = List<{
  release: Release
  discNumber?: DiscNumber
  position?: Position
  externalId: ExternalId
  externalLink?: ExternalLink
}>
