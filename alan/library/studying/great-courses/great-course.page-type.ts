import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"

export type GreatCourse = CollectionExternal & {
  title: Title
}

export const greatCourse = {
  id: "01a06574-0291-7002-a1fa-cbd1f9cc0fb4",
  pageTypeSlug: "page-type",
  slug: "great-course",
  definition: "one course Alan is taught by",
  pluralSlug: "great-courses",
  extendsSlug: "page-type/collection-external",
  partSlugs: ["text-property/title"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course states the minutes it runs to and the minutes Alan has watched.",
    },
    {
      invariantKind: "departure",
      statement: "A course names every shelf it sits on, the shelf of all of them among them.",
    },
    {
      invariantKind: "departure",
      statement: "A course Alan has not graded states no rank.",
    },
  ],
} as const satisfies PageType
