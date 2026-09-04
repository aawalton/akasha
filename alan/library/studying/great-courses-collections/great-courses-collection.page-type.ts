import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"

export type GreatCoursesCollection = CollectionExternal & {
  title: Title
}

export const greatCoursesCollection = {
  id: "01a06574-0291-7004-9508-74c1258e02c0",
  pageTypeSlug: "page-type",
  slug: "great-courses-collection",
  definition: "one shelf the whole Great Courses catalogue is reached through",
  pluralSlug: "great-courses-collections",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalogue's root shelf sits under nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shelf states no length of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The day the catalogue was last read is kept on its root shelf alone.",
    },
  ],
} as const satisfies PageType
