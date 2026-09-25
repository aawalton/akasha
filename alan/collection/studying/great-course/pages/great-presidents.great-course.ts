import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatPresidents = {
  id: "019db533-f3a0-7357-b2e5-de642c8382b2",
  type: "page-type/great-course",
  slug: "great-presidents",
  title: "Great Presidents",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1482.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-presidents",
      externalLink: "https://www.thegreatcoursesplus.com/great-presidents",
    },
  ],
} as const satisfies GreatCourse
