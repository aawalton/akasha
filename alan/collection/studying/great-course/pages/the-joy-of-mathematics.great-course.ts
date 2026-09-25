import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theJoyOfMathematics = {
  id: "019db533-f3a0-771d-8913-b1216dec828d",
  type: "page-type/great-course",
  slug: "the-joy-of-mathematics",
  title: "The Joy of Mathematics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-joy-of-mathematics",
      externalLink: "https://www.thegreatcoursesplus.com/the-joy-of-mathematics",
    },
  ],
} as const satisfies GreatCourse
