import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const wondriumPerspectives = {
  id: "019db533-f39e-79a8-8205-eaba4fef9fad",
  type: "great-course",
  slug: "wondrium-perspectives",
  title: "Wondrium Perspectives",
  status: "not-started",
  unit: "minutes",
  ownLength: 473.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "wondrium-perspectives",
  externalLink: "https://www.thegreatcoursesplus.com/wondrium-perspectives",
} as const satisfies GreatCourse
