import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { ExternalIdentity } from "akasha/alan/collection/external/properties/external-identity.record-property.types.ts"

export type CollectionExternal = Collection & {
  externalIdentity?: ExternalIdentity
}
