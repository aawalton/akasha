import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
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

export const book = {
  id: "01a06598-222b-7002-9769-8ec160210422",
  pageTypeSlug: "page-type",
  slug: "book",
  definition: "one book Alan reads",
  pluralSlug: "books",
  extendsSlug: ["page-type/collection-external"],
  partSlugs: [
    "number-property/original-publication-year",
    "number-property/page-count",
    "number-property/rating",
    "text-property/isbn",
    "text-property/isbn13",
    "text-property/publisher",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "isbn", required: false, many: false },
    { pagePropertySlug: "isbn13", required: false, many: false },
    { pagePropertySlug: "publisher", required: false, many: false },
    { pagePropertySlug: "original-publication-year", required: false, many: false },
    { pagePropertySlug: "rating", required: false, many: false },
    { pagePropertySlug: "page-count", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book's own length is counted in the words the book runs to.",
    },
    {
      invariantKind: "departure",
      statement: "A book's page count is the edition's own figure and is no length.",
    },
    {
      invariantKind: "departure",
      statement: "A book names the author as the author is written rather than as a page.",
    },
    {
      invariantKind: "departure",
      statement: "A book states which instalment of its series the book is.",
    },
    {
      invariantKind: "departure",
      statement: "A book names every series the book is an instalment of.",
    },
    {
      invariantKind: "departure",
      statement: "A book Alan has not graded states no rank.",
    },
    {
      invariantKind: "departure",
      statement: "A book opening its name with a number is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
