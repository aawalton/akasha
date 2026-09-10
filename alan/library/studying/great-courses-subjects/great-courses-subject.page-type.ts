import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const greatCoursesSubject = {
  id: "01a06574-0291-7003-8e30-de8222ab3a07",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "great-courses-subject",
  definition: "one shelf the courses are sorted onto by what they teach",
  pluralSlug: "great-courses-subjects",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subject has only courses.",
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
  types: "ts",
} as const satisfies PageType
