import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const greatCoursesCollection = {
  id: "01a06574-0291-7004-9508-74c1258e02c0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "great-courses-collection",
  definition: "one shelf the whole Great Courses catalogue is reached through",
  pluralSlug: "great-courses-collections",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
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
  types: "ts",
} as const satisfies PageType
