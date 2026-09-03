import type { GreatCourse } from "../../great-course.page-type.ts"

export const airFryerEssentials = {
  id: "019db533-f398-73fe-977f-d16feccbc07d",
  pageTypeSlug: "great-course",
  slug: "air-fryer-essentials",
  title: "Air Fryer Essentials",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 87.6,
  ownProgress: 87.6,
  partOfSlugs: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "air-fryer-essentials",
  externalLink: "https://www.thegreatcoursesplus.com/air-fryer-essentials",
} as const satisfies GreatCourse
