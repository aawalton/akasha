import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWisdomOfHistory = {
  id: "019db533-f3a0-71da-b6da-df9653fa8576",
  type: "page-type/great-course",
  slug: "the-wisdom-of-history",
  title: "The Wisdom of History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-wisdom-of-history",
      externalLink: "https://www.thegreatcoursesplus.com/the-wisdom-of-history",
    },
  ],
} as const satisfies GreatCourse
