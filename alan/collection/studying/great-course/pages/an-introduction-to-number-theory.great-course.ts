import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const anIntroductionToNumberTheory = {
  id: "019db533-f3a0-7a38-bde8-bfebfea94124",
  type: "page-type/great-course",
  slug: "an-introduction-to-number-theory",
  title: "An Introduction to Number Theory",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 736.8,
  ownProgress: 736.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "an-introduction-to-number-theory",
      externalLink: "https://www.thegreatcoursesplus.com/an-introduction-to-number-theory",
    },
  ],
} as const satisfies GreatCourse
