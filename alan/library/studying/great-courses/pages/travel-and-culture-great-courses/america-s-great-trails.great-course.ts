import type { GreatCourse } from "../../great-course.page-type.ts"

export const americaSGreatTrails = {
  id: "019db533-f39f-76c1-8c62-df2a0cafbb9f",
  pageTypeSlug: "great-course",
  slug: "america-s-great-trails",
  title: "America’s Great Trails",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 161.4,
  ownProgress: 161.4,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "america-s-great-trails",
  externalLink: "https://www.thegreatcoursesplus.com/america-s-great-trails",
} as const satisfies GreatCourse
