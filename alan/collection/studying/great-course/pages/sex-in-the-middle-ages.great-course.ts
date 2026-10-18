import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sexInTheMiddleAges = {
  id: "019db533-f39f-7dee-b04e-b162487fbd7c",
  type: "page-type/great-course",
  slug: "sex-in-the-middle-ages",
  title: "Sex in the Middle Ages",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 315,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sex-in-the-middle-ages",
      externalLink: "https://plus.thegreatcourses.com/sex-in-the-middle-ages",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
