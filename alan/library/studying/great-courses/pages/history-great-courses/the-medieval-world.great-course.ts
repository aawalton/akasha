import type { GreatCourse } from "../../great-course.page-type.ts"

export const theMedievalWorld = {
  id: "019db533-f39f-7827-8da2-b9ea783d24c1",
  pageTypeSlug: "great-course",
  slug: "the-medieval-world",
  title: "The Medieval World",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-medieval-world",
  externalLink: "https://www.thegreatcoursesplus.com/the-medieval-world",
} as const satisfies GreatCourse
