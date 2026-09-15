import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const greatCoursesSubject = {
  id: "01a06574-0291-7003-8e30-de8222ab3a07",
  type: "page-type/page-type",
  slug: "great-courses-subject",
  definition: "one shelf the courses are sorted onto by what they teach",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject has only courses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject states no length of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every subject sits under the shelf the subjects are sorted on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
