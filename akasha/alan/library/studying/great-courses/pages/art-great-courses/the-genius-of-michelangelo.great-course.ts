import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGeniusOfMichelangelo = {
  id: "019db533-f39f-73c6-8cd1-024f6a45a5ac",
  pageTypeSlug: "great-course",
  slug: "the-genius-of-michelangelo",
  title: "The Genius of Michelangelo",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 1075.8,
  ownProgress: 1075.8,
  partOfSlugs: ["all-great-courses", "art-great-courses"],
  source: "the-great-courses",
  externalId: "the-genius-of-michelangelo",
  externalLink: "https://www.thegreatcoursesplus.com/the-genius-of-michelangelo",
} as const satisfies GreatCourse
