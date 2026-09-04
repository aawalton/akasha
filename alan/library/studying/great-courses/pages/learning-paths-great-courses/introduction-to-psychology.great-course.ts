import type { GreatCourse } from "../../great-course.page-type.ts"

export const introductionToPsychology = {
  id: "019db533-f39f-7308-99dc-622b092fa6b7",
  pageTypeSlug: "great-course",
  slug: "introduction-to-psychology",
  title: "Introduction to Psychology",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1078.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "learning-paths-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "introduction-to-psychology",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-psychology",
} as const satisfies GreatCourse
