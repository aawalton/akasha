import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { DiscNumber } from "akasha/alan/music/catalog/track/properties/disc-number.number-property.types.ts"
import type { Explicit } from "akasha/alan/music/catalog/track/properties/explicit.boolean-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Track = CollectionExternal & {
  title: Title
  discNumber?: DiscNumber
  explicit?: Explicit
}
