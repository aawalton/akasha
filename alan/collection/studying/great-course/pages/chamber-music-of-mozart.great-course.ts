import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const chamberMusicOfMozart = {
  id: "019db533-f3a0-757f-979d-f90dfcd8832a",
  type: "page-type/great-course",
  slug: "chamber-music-of-mozart",
  title: "Chamber Music of Mozart",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 735.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "chamber-music-of-mozart",
      externalLink: "https://www.thegreatcoursesplus.com/chamber-music-of-mozart",
    },
  ],
} as const satisfies GreatCourse
