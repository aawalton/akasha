import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { Isbn } from "./properties/isbn.text-property.ts"
import type { Isbn13 } from "./properties/isbn13.text-property.ts"
import type { OriginalPublicationYear } from "./properties/original-publication-year.number-property.ts"
import type { PageCount } from "./properties/page-count.number-property.ts"
import type { Publisher } from "./properties/publisher.text-property.ts"
import type { Rating } from "./properties/rating.number-property.ts"

export type Book = CollectionExternal & {
  title: Title
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
  rating?: Rating
  pageCount?: PageCount
}
