import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToPlayPiano = {
  id: "019db533-f3a0-73a0-9f3a-f6ccce473e5a",
  type: "page-type/great-course",
  slug: "how-to-play-piano",
  title: "How to Play Piano",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1118.4,
  ownProgress: 1118.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-play-piano",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-play-piano",
    },
  ],
} as const satisfies GreatCourse
