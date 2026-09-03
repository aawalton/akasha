import type { GreatCourse } from "../../great-course.page-type.ts"

export const theHolyLandRevealed = {
  id: "019db533-f3a0-707e-9396-20d731ca9772",
  pageTypeSlug: "great-course",
  slug: "the-holy-land-revealed",
  title: "The Holy Land Revealed",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1121.4,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "history-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-holy-land-revealed",
  externalLink: "https://www.thegreatcoursesplus.com/the-holy-land-revealed",
} as const satisfies GreatCourse
