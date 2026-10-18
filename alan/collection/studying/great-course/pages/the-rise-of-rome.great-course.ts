import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRiseOfRome = {
  id: "019db533-f39f-7cdb-bbbd-ba4ac2b01c87",
  type: "page-type/great-course",
  slug: "the-rise-of-rome",
  title: "The Rise of Rome",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 733.8,
  ownProgress: 733.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "rise-of-rome",
      externalLink: "https://plus.thegreatcourses.com/rise-of-rome",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
