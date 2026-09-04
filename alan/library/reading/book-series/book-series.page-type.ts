import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { MaturityRating } from "./properties/maturity-rating.select-property.ts"

export type BookSeries = CollectionExternal & {
  title: Title
  maturityRating?: MaturityRating
}

export const bookSeries = {
  id: "01a06598-222b-7003-beee-2001c8924b27",
  pageTypeSlug: "page-type",
  slug: "book-series",
  definition: "a shelf holding the books of one work",
  pluralSlug: "book-series",
  extendsSlug: "page-type/collection-external",
  partSlugs: ["select-property/maturity-rating", "text-property/title"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "maturity-rating", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A series holds books alone, so a series states no length of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The books a series holds are the books naming that series.",
    },
    {
      invariantKind: "departure",
      statement: "A series Alan has not graded states no rank.",
    },
    {
      invariantKind: "departure",
      statement: "A series opening its name with a number is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
