import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBanjoMusicHistoryAndHeritage = {
  id: "019db533-f3a0-7306-acba-fa601635dd5e",
  type: "page-type/great-course",
  slug: "the-banjo-music-history-and-heritage",
  title: "The Banjo: Music, History, and Heritage",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 235.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-banjo-music-history-and-heritage",
      externalLink: "https://www.thegreatcoursesplus.com/the-banjo-music-history-and-heritage",
    },
  ],
} as const satisfies GreatCourse
