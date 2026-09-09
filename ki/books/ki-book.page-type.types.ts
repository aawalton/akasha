import type { Isbn } from "../../alan/library/reading/books/properties/isbn.text-property.ts"
import type { Isbn13 } from "../../alan/library/reading/books/properties/isbn13.text-property.ts"
import type { OriginalPublicationYear } from "../../alan/library/reading/books/properties/original-publication-year.number-property.ts"
import type { Publisher } from "../../alan/library/reading/books/properties/publisher.text-property.ts"
import type { KiCollectionTemplate } from "../collection-templates/ki-collection-template.page-type.ts"

export type KiBook = KiCollectionTemplate & {
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
}
