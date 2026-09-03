import type { GreatCourse } from "../../great-course.page-type.ts"

export const exploringTheMayanWorld = {
  id: "019db533-f3a0-74ae-834f-0d3bd9b171a7",
  pageTypeSlug: "great-course",
  slug: "exploring-the-mayan-world",
  title: "Exploring the Mayan World",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 205.8,
  ownProgress: 205.8,
  partOfSlugs: ["all-great-courses", "history-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "exploring-the-mayan-world",
  externalLink: "https://www.thegreatcoursesplus.com/exploring-the-mayan-world",
} as const satisfies GreatCourse
