import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const robotics = {
  id: "019db533-f39e-7ee3-9d3e-123f426b8373",
  type: "great-course",
  slug: "robotics",
  title: "Robotics",
  status: "not-started",
  unit: "minutes",
  ownLength: 762.6,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "robotics",
  externalLink: "https://www.thegreatcoursesplus.com/robotics",
} as const satisfies GreatCourse
