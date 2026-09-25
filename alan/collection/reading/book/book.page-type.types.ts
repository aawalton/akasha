import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { Isbn } from "akasha/alan/collection/reading/book/properties/isbn.text-property.types.ts"
import type { Isbn13 } from "akasha/alan/collection/reading/book/properties/isbn13.text-property.types.ts"
import type { OriginalPublicationYear } from "akasha/alan/collection/reading/book/properties/original-publication-year.number-property.types.ts"
import type { PageCount } from "akasha/alan/collection/reading/book/properties/page-count.number-property.types.ts"
import type { Publisher } from "akasha/alan/collection/reading/book/properties/publisher.text-property.types.ts"
import type { Rating } from "akasha/alan/collection/reading/book/properties/rating.number-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Book = CollectionExternal & {
  title: Title
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
  rating?: Rating
  pageCount?: PageCount
}
