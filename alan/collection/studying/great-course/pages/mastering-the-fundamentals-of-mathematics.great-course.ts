import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masteringTheFundamentalsOfMathematics = {
  id: "019db533-f3a0-7826-a92e-5b3c6d8778bf",
  type: "page-type/great-course",
  slug: "mastering-the-fundamentals-of-mathematics",
  title: "Mastering the Fundamentals of Mathematics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 750.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mastering-the-fundamentals-of-mathematics",
      externalLink: "https://www.thegreatcoursesplus.com/mastering-the-fundamentals-of-mathematics",
    },
  ],
} as const satisfies GreatCourse
