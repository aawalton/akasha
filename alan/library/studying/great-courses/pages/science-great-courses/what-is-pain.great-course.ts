import type { GreatCourse } from "../../great-course.page-type.ts"

export const whatIsPain = {
  id: "01a06578-6719-7007-82ce-f4fef84b704a",
  pageTypeSlug: "great-course",
  slug: "what-is-pain",
  title: "What Is Pain?",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "what-is-pain",
  externalLink: "https://plus.thegreatcourses.com/what-is-pain",
} as const satisfies GreatCourse
