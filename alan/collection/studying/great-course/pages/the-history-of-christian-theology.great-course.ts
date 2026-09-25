import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfChristianTheology = {
  id: "019db533-f39e-7b6f-a382-913e35783e06",
  type: "page-type/great-course",
  slug: "the-history-of-christian-theology",
  title: "The History of Christian Theology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1132.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-christian-theology",
      externalLink: "https://www.thegreatcoursesplus.com/the-history-of-christian-theology",
    },
  ],
} as const satisfies GreatCourse
