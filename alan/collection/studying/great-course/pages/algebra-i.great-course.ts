import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const algebraI = {
  id: "019db533-f3a0-749f-9bac-63eacc66429c",
  type: "page-type/great-course",
  slug: "algebra-i",
  title: "Algebra I",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1110.6,
  ownProgress: 1110.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "algebra-i",
      externalLink: "https://www.thegreatcoursesplus.com/algebra-i",
    },
  ],
} as const satisfies GreatCourse
