import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMiddleEastInThe20thCentury = {
  id: "019db533-f39f-7c71-af49-e9059a1386e3",
  type: "page-type/great-course",
  slug: "the-middle-east-in-the-20th-century",
  title: "The Middle East in the 20th Century",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 663,
  ownProgress: 663,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-middle-east-in-the-20th-century",
      externalLink: "https://www.thegreatcoursesplus.com/the-middle-east-in-the-20th-century",
    },
  ],
} as const satisfies GreatCourse
