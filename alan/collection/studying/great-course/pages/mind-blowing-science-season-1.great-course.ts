import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindBlowingScienceSeason1 = {
  id: "019db533-f39e-7d33-b285-afa950739c72",
  type: "page-type/great-course",
  slug: "mind-blowing-science-season-1",
  title: "Mind-Blowing Science: Season 1",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 247.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mind-blowing-science",
      externalLink: "https://www.thegreatcoursesplus.com/mind-blowing-science",
    },
  ],
} as const satisfies GreatCourse
