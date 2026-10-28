import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const buddhism = {
  id: "019db533-f39e-7d14-9215-c9c103499e84",
  type: "page-type/great-course",
  slug: "buddhism",
  title: "Buddhism",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 746.23,
  ownProgress: 93.92,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "buddhism",
      externalLink: "https://plus.thegreatcourses.com/buddhism",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-28T21:47:26.285Z",
  progressedAt: "2026-10-28T21:47:26.285Z",
} as const satisfies GreatCourse
