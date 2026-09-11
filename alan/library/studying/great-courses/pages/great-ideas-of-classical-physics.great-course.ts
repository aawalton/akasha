import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const greatIdeasOfClassicalPhysics = {
  id: "019db533-f39f-729e-b9a0-3e7931cb716f",
  type: "great-course",
  slug: "great-ideas-of-classical-physics",
  title: "Great Ideas of Classical Physics",
  status: "not-started",
  unit: "minutes",
  ownLength: 735,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "great-ideas-of-classical-physics",
  externalLink: "https://www.thegreatcoursesplus.com/great-ideas-of-classical-physics",
} as const satisfies GreatCourse
