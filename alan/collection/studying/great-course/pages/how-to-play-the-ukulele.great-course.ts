import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToPlayTheUkulele = {
  id: "019db533-f3a0-736e-a0a3-4b7c19a1bbc7",
  type: "page-type/great-course",
  slug: "how-to-play-the-ukulele",
  title: "How to Play the Ukulele",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 386.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-play-the-ukulele",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-play-the-ukulele",
    },
  ],
} as const satisfies GreatCourse
