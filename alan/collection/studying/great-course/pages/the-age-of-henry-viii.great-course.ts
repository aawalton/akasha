import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAgeOfHenryViii = {
  id: "019db533-f3a0-70b3-b046-c4bdaf7cc924",
  type: "page-type/great-course",
  slug: "the-age-of-henry-viii",
  title: "The Age of Henry VIII",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-age-of-henry-viii",
      externalLink: "https://www.thegreatcoursesplus.com/the-age-of-henry-viii",
    },
  ],
} as const satisfies GreatCourse
