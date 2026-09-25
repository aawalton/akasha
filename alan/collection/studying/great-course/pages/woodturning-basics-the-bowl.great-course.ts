import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const woodturningBasicsTheBowl = {
  id: "019db533-f39e-752d-8817-4deefccbbb0b",
  type: "page-type/great-course",
  slug: "woodturning-basics-the-bowl",
  title: "Woodturning Basics: The Bowl",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 157.2,
  ownProgress: 157.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "woodturning-basics-the-bowl",
      externalLink: "https://www.thegreatcoursesplus.com/woodturning-basics-the-bowl",
    },
  ],
} as const satisfies GreatCourse
