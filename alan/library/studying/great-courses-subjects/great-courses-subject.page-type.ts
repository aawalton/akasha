import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type GreatCoursesSubject = CollectionExternal & {
  title: Title
}

export const greatCoursesSubject = {
  id: "01a06574-0291-7003-8e30-de8222ab3a07",
  pageTypeSlug: "page-type",
  slug: "great-courses-subject",
  definition: "one shelf the courses are sorted onto by what they teach",
  pluralSlug: "great-courses-subjects",
  extendsSlug: ["page-type/collection-external"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subject holds only courses.",
    },
    {
      invariantKind: "departure",
      statement: "A subject states no length of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every subject sits under the shelf the subjects are sorted on.",
    },
  ],
} as const satisfies PageType
