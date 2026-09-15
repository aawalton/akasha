import type { HeaderFields } from "akasha/page/type/properties/header-fields.text-property.types.ts"
import type { HeaderShowCover } from "akasha/page/type/properties/header-show-cover.boolean-property.types.ts"

export type CollectionHeader = {
  showCover?: HeaderShowCover
  fields: HeaderFields
}
