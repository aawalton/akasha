import type { GreatCourse } from "../../great-course.page-type.ts"

export const virtualVenice = {
  id: "019db533-f39f-72fd-8750-0e746dd40305",
  pageTypeSlug: "great-course",
  slug: "virtual-venice",
  title: "Virtual Venice",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 39.6,
  ownProgress: 39.6,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "virtual-venice",
  externalLink: "https://www.thegreatcoursesplus.com/virtual-venice",
} as const satisfies GreatCourse
