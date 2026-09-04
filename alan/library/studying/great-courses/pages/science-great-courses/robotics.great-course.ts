import type { GreatCourse } from "../../great-course.page-type.ts"

export const robotics = {
  id: "019db533-f39e-7ee3-9d3e-123f426b8373",
  pageTypeSlug: "great-course",
  slug: "robotics",
  title: "Robotics",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 762.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "robotics",
  externalLink: "https://www.thegreatcoursesplus.com/robotics",
} as const satisfies GreatCourse
