import type { GreatCourse } from "../../great-course.page-type.ts"

export const theBigHistoryOfCivilizations = {
  id: "019db533-f3a0-71ee-b6ad-db6edc9d3e68",
  pageTypeSlug: "great-course",
  slug: "the-big-history-of-civilizations",
  title: "The Big History of Civilizations",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1075.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-big-history-of-civilizations",
  externalLink: "https://www.thegreatcoursesplus.com/the-big-history-of-civilizations",
} as const satisfies GreatCourse
