import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAmericanCivilWar = {
  id: "019db533-f3a0-7096-a9ff-6f9839ab1be3",
  pageTypeSlug: "great-course",
  slug: "the-american-civil-war",
  title: "The American Civil War",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 1461,
  ownProgress: 1461,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "the-american-civil-war",
  externalLink: "https://www.thegreatcoursesplus.com/the-american-civil-war",
} as const satisfies GreatCourse
