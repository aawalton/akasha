import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const searchingForTheHistoricalJesus = {
  id: "019db533-f39f-758b-8065-03dab851f6de",
  type: "page-type/great-course",
  slug: "searching-for-the-historical-jesus",
  title: "Searching for the Historical Jesus",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 324.6,
  ownProgress: 324.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "searching-for-the-historical-jesus",
      externalLink: "https://www.thegreatcoursesplus.com/searching-for-the-historical-jesus",
    },
  ],
} as const satisfies GreatCourse
