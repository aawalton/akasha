import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const turningPointsInAmericanHistory = {
  id: "019db533-f39f-7af3-8abf-a9d1e375bf18",
  type: "page-type/great-course",
  slug: "turning-points-in-american-history",
  title: "Turning Points in American History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1465.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "turning-points-in-american-history",
      externalLink: "https://plus.thegreatcourses.com/turning-points-in-american-history",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
