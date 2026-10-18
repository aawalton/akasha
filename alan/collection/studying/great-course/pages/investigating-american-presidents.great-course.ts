import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const investigatingAmericanPresidents = {
  id: "019db533-f3a0-7453-ab32-356db260f2c3",
  type: "page-type/great-course",
  slug: "investigating-american-presidents",
  title: "Investigating American Presidents",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 413.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "investigating-american-presidents",
      externalLink: "https://plus.thegreatcourses.com/investigating-american-presidents",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
