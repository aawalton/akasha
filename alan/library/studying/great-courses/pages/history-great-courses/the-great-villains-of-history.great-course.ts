import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatVillainsOfHistory = {
  id: "01a06578-6718-7005-b8f2-5dd254a23519",
  pageTypeSlug: "great-course",
  slug: "the-great-villains-of-history",
  title: "The Great Villains of History",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-villains-of-history",
  externalLink: "https://plus.thegreatcourses.com/the-great-villains-of-history",
} as const satisfies GreatCourse
