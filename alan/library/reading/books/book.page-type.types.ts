import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { Isbn } from "akasha/alan/library/reading/books/properties/isbn.text-property.types.ts"
import type { Isbn13 } from "akasha/alan/library/reading/books/properties/isbn13.text-property.types.ts"
import type { OriginalPublicationYear } from "akasha/alan/library/reading/books/properties/original-publication-year.number-property.types.ts"
import type { PageCount } from "akasha/alan/library/reading/books/properties/page-count.number-property.types.ts"
import type { Publisher } from "akasha/alan/library/reading/books/properties/publisher.text-property.types.ts"
import type { Rating } from "akasha/alan/library/reading/books/properties/rating.number-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Book = CollectionExternal & {
  title: Title
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
  rating?: Rating
  pageCount?: PageCount
}
