import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { ExternalIdentity } from "akasha/alan/collections/externals/properties/external-identity.record-property.types.ts"

export type CollectionExternal = Collection & {
  externalIdentity?: ExternalIdentity
}
