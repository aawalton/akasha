import type { Isbn } from "akasha/alan/collection/reading/book/properties/isbn.text-property.types.ts"
import type { Isbn13 } from "akasha/alan/collection/reading/book/properties/isbn13.text-property.types.ts"
import type { OriginalPublicationYear } from "akasha/alan/collection/reading/book/properties/original-publication-year.number-property.types.ts"
import type { Publisher } from "akasha/alan/collection/reading/book/properties/publisher.text-property.types.ts"
import type { KiCollectionTemplate } from "akasha/person/pages/ki/collection-template/ki-collection-template.page-type.types.ts"

export type KiBook = KiCollectionTemplate & {
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
}
