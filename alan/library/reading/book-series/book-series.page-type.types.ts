import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { MaturityRating } from "akasha/alan/library/reading/book-series/properties/maturity-rating.select-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

export type BookSeries = CollectionExternal & {
  title: Title
  maturityRating?: MaturityRating
}
