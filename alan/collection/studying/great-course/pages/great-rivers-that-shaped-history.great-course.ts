import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatRiversThatShapedHistory = {
  id: "01a06578-671b-7001-a73a-6297cd522904",
  type: "page-type/great-course",
  slug: "great-rivers-that-shaped-history",
  title: "Great Rivers That Shaped History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-rivers-that-shaped-history",
      externalLink: "https://plus.thegreatcourses.com/great-rivers-that-shaped-history",
    },
  ],
} as const satisfies GreatCourse
