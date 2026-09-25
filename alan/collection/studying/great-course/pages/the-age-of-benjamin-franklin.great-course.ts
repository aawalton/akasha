import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAgeOfBenjaminFranklin = {
  id: "019db533-f39f-7d3a-a52f-86ba8f044a58",
  type: "page-type/great-course",
  slug: "the-age-of-benjamin-franklin",
  title: "The Age of Benjamin Franklin",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 758.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-age-of-benjamin-franklin",
      externalLink: "https://www.thegreatcoursesplus.com/the-age-of-benjamin-franklin",
    },
  ],
} as const satisfies GreatCourse
