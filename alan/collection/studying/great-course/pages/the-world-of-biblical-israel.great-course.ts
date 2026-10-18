import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldOfBiblicalIsrael = {
  id: "019db533-f39f-7ff9-893f-b9f68082338f",
  type: "page-type/great-course",
  slug: "the-world-of-biblical-israel",
  title: "The World of Biblical Israel",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 738.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-of-biblical-israel",
      externalLink: "https://plus.thegreatcourses.com/the-world-of-biblical-israel",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
