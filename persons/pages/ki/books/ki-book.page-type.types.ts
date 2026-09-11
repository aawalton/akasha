import type { Isbn } from "akasha/alan/library/reading/books/properties/isbn.text-property.types.ts"
import type { Isbn13 } from "akasha/alan/library/reading/books/properties/isbn13.text-property.types.ts"
import type { OriginalPublicationYear } from "akasha/alan/library/reading/books/properties/original-publication-year.number-property.types.ts"
import type { Publisher } from "akasha/alan/library/reading/books/properties/publisher.text-property.types.ts"
import type { KiCollectionTemplate } from "akasha/persons/pages/ki/collection-templates/ki-collection-template.page-type.types.ts"

export type KiBook = KiCollectionTemplate & {
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
}
