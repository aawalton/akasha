import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSkepticSGuideToAmericanHistory = {
  id: "019db533-f3a0-7273-a078-b1914b4a3346",
  type: "page-type/great-course",
  slug: "the-skeptic-s-guide-to-american-history",
  title: "The Skeptic's Guide to American History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-skeptics-guide-to-american-history",
      externalLink: "https://plus.thegreatcourses.com/the-skeptics-guide-to-american-history",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
