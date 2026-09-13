import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ExternalIdentity } from "akasha/alan/collections/externals/properties/external-identity.record-property.types.ts"
import type { ExternalLink } from "akasha/alan/collections/externals/properties/external-link.url-property.types.ts"

export type CollectionExternal = Collection & {
  externalLink?: ExternalLink
  externalIdentity?: ExternalIdentity
}
