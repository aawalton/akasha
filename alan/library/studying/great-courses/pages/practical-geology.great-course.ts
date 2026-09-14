import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const practicalGeology = {
  id: "019db533-f39e-7f2d-b10b-c8339fceaa3e",
  type: "great-course",
  slug: "practical-geology",
  title: "Practical Geology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 756.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "practical-geology",
      externalLink: "https://www.thegreatcoursesplus.com/practical-geology",
    },
  ],
} as const satisfies GreatCourse
