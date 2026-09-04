import type { GreatCourse } from "../../great-course.page-type.ts"

export const theLearningBrain = {
  id: "019db533-f39e-7dc6-9ca2-7399c3846788",
  pageTypeSlug: "great-course",
  slug: "the-learning-brain",
  title: "The Learning Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 752.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "learning-paths-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-learning-brain",
  externalLink: "https://www.thegreatcoursesplus.com/the-learning-brain",
} as const satisfies GreatCourse
