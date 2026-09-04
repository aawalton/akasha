import type { PageType } from "@akasha/pages-system/page-type"
import type { Isbn } from "../../alan/library/reading/books/properties/isbn.text-property.ts"
import type { Isbn13 } from "../../alan/library/reading/books/properties/isbn13.text-property.ts"
import type { OriginalPublicationYear } from "../../alan/library/reading/books/properties/original-publication-year.number-property.ts"
import type { Publisher } from "../../alan/library/reading/books/properties/publisher.text-property.ts"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiBook = KiCollectionTemplate & {
  isbn?: Isbn
  isbn13?: Isbn13
  publisher?: Publisher
  originalPublicationYear?: OriginalPublicationYear
}

export const kiBook = {
  id: "01a06825-d0ec-7364-85c4-e2b19f12133e",
  pageTypeSlug: "page-type",
  slug: "ki-book",
  definition: "one edition of a book Ki keeps",
  pluralSlug: "ki-books",
  extendsSlug: ["page-type/ki-collection-template"],
  partSlugs: [],
  properties: [
    { pagePropertySlug: "isbn", required: false, many: false },
    { pagePropertySlug: "isbn13", required: false, many: false },
    { pagePropertySlug: "publisher", required: false, many: false },
    { pagePropertySlug: "original-publication-year", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book of Ki's names the one author credited first.",
    },
    {
      invariantKind: "departure",
      statement: "A book of Ki's names everyone else credited with writing the book.",
    },
  ],
} as const satisfies PageType
