import type { GreatCourse } from "../../great-course.page-type.ts"

export const chamberMusicOfMozart = {
  id: "019db533-f3a0-757f-979d-f90dfcd8832a",
  pageTypeSlug: "great-course",
  slug: "chamber-music-of-mozart",
  title: "Chamber Music of Mozart",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 735.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "chamber-music-of-mozart",
  externalLink: "https://www.thegreatcoursesplus.com/chamber-music-of-mozart",
} as const satisfies GreatCourse
