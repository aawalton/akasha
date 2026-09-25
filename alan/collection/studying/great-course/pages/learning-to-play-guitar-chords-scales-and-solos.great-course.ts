import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningToPlayGuitarChordsScalesAndSolos = {
  id: "019db533-f3a0-72f7-92f7-10fc8b9a90d3",
  type: "page-type/great-course",
  slug: "learning-to-play-guitar-chords-scales-and-solos",
  title: "Learning to Play Guitar: Chords, Scales, and Solos",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 751.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-to-play-guitar-chords-scales-and-solos",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-to-play-guitar-chords-scales-and-solos",
    },
  ],
} as const satisfies GreatCourse
