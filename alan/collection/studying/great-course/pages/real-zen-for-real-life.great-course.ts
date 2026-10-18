import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const realZenForRealLife = {
  id: "019db533-f39e-7a66-99e9-d3db2309b4a0",
  type: "page-type/great-course",
  slug: "real-zen-for-real-life",
  title: "Real Zen for Real Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 886.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "real-zen-for-real-life",
      externalLink: "https://plus.thegreatcourses.com/real-zen-for-real-life",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
