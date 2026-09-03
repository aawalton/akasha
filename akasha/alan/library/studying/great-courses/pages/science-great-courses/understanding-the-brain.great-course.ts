import type { GreatCourse } from "../../great-course.page-type.ts"

export const understandingTheBrain = {
  id: "019db533-f39f-7095-b6ad-6a7fecfe4c2b",
  pageTypeSlug: "great-course",
  slug: "understanding-the-brain",
  title: "Understanding the Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1122,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "understanding-the-brain",
  externalLink: "https://www.thegreatcoursesplus.com/understanding-the-brain",
} as const satisfies GreatCourse
