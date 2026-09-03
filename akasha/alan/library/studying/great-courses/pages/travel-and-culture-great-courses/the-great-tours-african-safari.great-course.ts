import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursAfricanSafari = {
  id: "019db533-f39f-744f-8f4b-7065af9f6721",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-african-safari",
  title: "The Great Tours: African Safari",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 740.4,
  ownProgress: 740.4,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-african-safari",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-african-safari",
} as const satisfies GreatCourse
