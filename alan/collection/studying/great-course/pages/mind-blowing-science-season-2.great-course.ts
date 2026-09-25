import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindBlowingScienceSeason2 = {
  id: "019db533-f39f-720a-b77c-1d3406aef85a",
  type: "page-type/great-course",
  slug: "mind-blowing-science-season-2",
  title: "Mind-Blowing Science: Season 2",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 240,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mind-blowing-science-season-2",
      externalLink: "https://www.thegreatcoursesplus.com/mind-blowing-science-season-2",
    },
  ],
} as const satisfies GreatCourse
