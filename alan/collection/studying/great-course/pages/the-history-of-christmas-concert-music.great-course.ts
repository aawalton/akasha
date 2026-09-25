import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfChristmasConcertMusic = {
  id: "019db533-f3a0-71d1-80f1-fadeb0d07d8e",
  type: "page-type/great-course",
  slug: "the-history-of-christmas-concert-music",
  title: "The History of Christmas Concert Music",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-christmas-concert-music",
      externalLink: "https://www.thegreatcoursesplus.com/the-history-of-christmas-concert-music",
    },
  ],
} as const satisfies GreatCourse
