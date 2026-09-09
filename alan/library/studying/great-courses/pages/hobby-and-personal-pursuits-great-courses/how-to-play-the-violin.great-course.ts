import type { GreatCourse } from "../../great-course.page-type.ts"

export const howToPlayTheViolin = {
  id: "019db533-f3a0-7399-ab8f-ff39610e8cff",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "how-to-play-the-violin",
  title: "How to Play the Violin",
  status: "not-started",
  unit: "minutes",
  ownLength: 337.8,
  ownProgress: 0,
  partOfCollections: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "music-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-to-play-the-violin",
  externalLink: "https://www.thegreatcoursesplus.com/how-to-play-the-violin",
} as const satisfies GreatCourse
