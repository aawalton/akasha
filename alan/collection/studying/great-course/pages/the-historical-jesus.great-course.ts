import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoricalJesus = {
  id: "019db533-f39e-78fb-bcec-983677d766d2",
  type: "page-type/great-course",
  slug: "the-historical-jesus",
  title: "The Historical Jesus",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 733.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-historical-jesus",
      externalLink: "https://www.thegreatcoursesplus.com/the-historical-jesus",
    },
  ],
} as const satisfies GreatCourse
