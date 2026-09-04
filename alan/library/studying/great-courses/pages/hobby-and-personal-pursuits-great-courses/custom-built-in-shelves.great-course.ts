import type { GreatCourse } from "../../great-course.page-type.ts"

export const customBuiltInShelves = {
  id: "019db533-f39e-74d2-86f8-b317d706c4d5",
  pageTypeSlug: "great-course",
  slug: "custom-built-in-shelves",
  title: "Custom Built-In Shelves",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 84.6,
  ownProgress: 84.6,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "custom-built-in-shelves",
  externalLink: "https://www.thegreatcoursesplus.com/custom-built-in-shelves",
} as const satisfies GreatCourse
