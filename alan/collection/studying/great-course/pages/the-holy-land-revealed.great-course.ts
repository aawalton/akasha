import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHolyLandRevealed = {
  id: "019db533-f3a0-707e-9396-20d731ca9772",
  type: "page-type/great-course",
  slug: "the-holy-land-revealed",
  title: "The Holy Land Revealed",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1121.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-holy-land-revealed",
      externalLink: "https://www.thegreatcoursesplus.com/the-holy-land-revealed",
    },
  ],
} as const satisfies GreatCourse
