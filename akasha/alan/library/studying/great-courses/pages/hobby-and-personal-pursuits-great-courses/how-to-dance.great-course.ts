import type { GreatCourse } from "../../great-course.page-type.ts"

export const howToDance = {
  id: "019db533-f3a0-73af-8287-d1e79e039460",
  pageTypeSlug: "great-course",
  slug: "how-to-dance",
  title: "How to Dance",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 477,
  ownProgress: 477,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "music-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-to-dance",
  externalLink: "https://www.thegreatcoursesplus.com/how-to-dance",
} as const satisfies GreatCourse
