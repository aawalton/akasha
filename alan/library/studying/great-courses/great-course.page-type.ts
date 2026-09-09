import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type GreatCourse = CollectionExternal & {
  title: Title
}

export const greatCourse = {
  id: "01a06574-0291-7002-a1fa-cbd1f9cc0fb4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "great-course",
  definition: "one course Alan is taught by",
  pluralSlug: "great-courses",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course states the minutes the course runs to and the minutes Alan has watched.",
    },
    {
      invariantKind: "departure",
      statement: "A course names every shelf the course sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A course Alan has not graded states no rank.",
    },
  ],
} as const satisfies PageType
