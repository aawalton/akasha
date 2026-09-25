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
      externalLink: "https://www.thegreatcoursesplus.com/investigating-american-presidents",
    },
  ],
} as const satisfies GreatCourse
