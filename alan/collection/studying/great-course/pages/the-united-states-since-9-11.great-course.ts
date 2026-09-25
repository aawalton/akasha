import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theUnitedStatesSince911 = {
  id: "019db533-f39f-7cd0-9216-4e4cd006b108",
  type: "page-type/great-course",
  slug: "the-united-states-since-9-11",
  title: "The United States since 9/11",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 73.2,
  ownProgress: 73.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-united-states-since-911",
      externalLink: "https://www.thegreatcoursesplus.com/the-united-states-since-911",
    },
  ],
} as const satisfies GreatCourse
