import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const londonInTheTimeOfDickens = {
  id: "019db533-f39e-772e-a2ed-95ed08507e07",
  type: "page-type/great-course",
  slug: "london-in-the-time-of-dickens",
  title: "London in the Time of Dickens",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 372,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "london-in-the-time-of-dickens",
      externalLink: "https://www.thegreatcoursesplus.com/london-in-the-time-of-dickens",
    },
  ],
} as const satisfies GreatCourse
