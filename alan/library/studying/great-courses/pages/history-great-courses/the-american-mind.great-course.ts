import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAmericanMind = {
  id: "019db533-f39f-7d05-8bfe-c7571c48d98b",
  pageTypeSlug: "great-course",
  slug: "the-american-mind",
  title: "The American Mind",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1115.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-american-mind",
  externalLink: "https://www.thegreatcoursesplus.com/the-american-mind",
} as const satisfies GreatCourse
