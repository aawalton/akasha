import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { MaturityRating } from "akasha/alan/collection/reading/book-series/properties/maturity-rating.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type BookSeries = CollectionExternal & {
  title: Title
  maturityRating?: MaturityRating
}
