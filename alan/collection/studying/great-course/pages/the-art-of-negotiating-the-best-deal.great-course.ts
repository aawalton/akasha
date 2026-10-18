import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfNegotiatingTheBestDeal = {
  id: "019db533-f39e-7273-9d19-9ada5bde577e",
  type: "page-type/great-course",
  slug: "the-art-of-negotiating-the-best-deal",
  title: "The Art of Negotiating the Best Deal",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 777,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-negotiating-the-best-deal",
      externalLink: "https://plus.thegreatcourses.com/the-art-of-negotiating-the-best-deal",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
