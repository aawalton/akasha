import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { BookKind } from "./properties/book-kind.select-property.ts"

export type Book = CollectionExternal & {
  title: Title
  kind: BookKind
}

export const book = {
  id: "01a06598-222b-7002-9769-8ec160210422",
  pageTypeSlug: "page-type",
  slug: "book",
  definition: "one book Alan reads or writes",
  pluralSlug: "books",
  extendsSlug: "page-type/collection-external",
  partSlugs: ["select-property/book-kind", "text-property/title"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "book-kind", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book's own length is counted in the words the book runs to.",
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
