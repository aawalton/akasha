import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAmericanRevolution = {
  id: "019db533-f39f-7973-ab99-e014d7379d42",
  pageTypeSlug: "great-course",
  slug: "the-american-revolution",
  title: "The American Revolution",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "the-american-revolution",
  externalLink: "https://www.thegreatcoursesplus.com/the-american-revolution",
} as const satisfies GreatCourse
