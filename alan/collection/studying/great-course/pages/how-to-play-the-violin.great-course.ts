import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToPlayTheViolin = {
  id: "019db533-f3a0-7399-ab8f-ff39610e8cff",
  type: "page-type/great-course",
  slug: "how-to-play-the-violin",
  title: "How to Play the Violin",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 337.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-play-the-violin",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-play-the-violin",
    },
  ],
} as const satisfies GreatCourse
