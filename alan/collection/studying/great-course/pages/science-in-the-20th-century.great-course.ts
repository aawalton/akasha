import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scienceInThe20thCentury = {
  id: "019db533-f39e-7ece-bc77-fc95c2fb0db5",
  type: "page-type/great-course",
  slug: "science-in-the-20th-century",
  title: "Science in the 20th Century",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1095,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "science-in-the-20th-century",
      externalLink: "https://www.thegreatcoursesplus.com/science-in-the-20th-century",
    },
  ],
} as const satisfies GreatCourse
