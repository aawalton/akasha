import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCastlesOfEurope = {
  id: "019db533-f3a0-716c-83cc-bf0aad693508",
  type: "page-type/great-course",
  slug: "great-castles-of-europe",
  title: "Great Castles of Europe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 767.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-castles-of-europe",
      externalLink: "https://www.thegreatcoursesplus.com/great-castles-of-europe",
    },
  ],
} as const satisfies GreatCourse
