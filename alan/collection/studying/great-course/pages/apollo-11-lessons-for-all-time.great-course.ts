import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const apollo11LessonsForAllTime = {
  id: "019db533-f39f-7e6d-81da-50a11b044924",
  type: "page-type/great-course",
  slug: "apollo-11-lessons-for-all-time",
  title: "Apollo 11: Lessons for All time",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 72.6,
  ownProgress: 72.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "apollo-11-lessons-for-all-time",
      externalLink: "https://plus.thegreatcourses.com/apollo-11-lessons-for-all-time",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
