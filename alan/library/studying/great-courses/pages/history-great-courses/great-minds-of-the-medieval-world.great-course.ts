import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatMindsOfTheMedievalWorld = {
  id: "019db533-f3a0-7171-bdaa-3a1b9af26f2a",
  pageTypeSlug: "great-course",
  slug: "great-minds-of-the-medieval-world",
  title: "Great Minds of the Medieval World",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 722.4,
  ownProgress: 722.4,
  partOfSlugs: [
    "all-great-courses",
    "history-great-courses",
    "learning-paths-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "great-minds-of-the-medieval-world",
  externalLink: "https://www.thegreatcoursesplus.com/great-minds-of-the-medieval-world",
} as const satisfies GreatCourse
