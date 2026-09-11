import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const introductionToPsychology = {
  id: "019db533-f39f-7308-99dc-622b092fa6b7",
  type: "great-course",
  slug: "introduction-to-psychology",
  title: "Introduction to Psychology",
  status: "not-started",
  unit: "minutes",
  ownLength: 1078.2,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "learning-paths-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "introduction-to-psychology",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-psychology",
} as const satisfies GreatCourse
