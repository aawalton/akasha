import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursEnglandScotlandAndWales = {
  id: "019db533-f39f-7bfe-95be-91d2526c9118",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-england-scotland-and-wales",
  title: "The Great Tours: England, Scotland, and Wales",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 1076.4,
  ownProgress: 1076.4,
  partOfSlugs: ["all-great-courses", "history-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-england-scotland-and-wales",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-england-scotland-and-wales",
} as const satisfies GreatCourse
