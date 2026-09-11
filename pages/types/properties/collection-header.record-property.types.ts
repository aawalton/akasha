import type { HeaderFields } from "akasha/pages/types/properties/header-fields.text-property.types.ts"
import type { HeaderShowCover } from "akasha/pages/types/properties/header-show-cover.boolean-property.types.ts"

export type CollectionHeader = {
  showCover?: HeaderShowCover
  fields: HeaderFields
}
