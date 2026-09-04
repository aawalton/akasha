import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursIceland = {
  id: "019db533-f39f-73fa-86aa-bdaf41ec07e9",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-iceland",
  title: "The Great Tours: Iceland",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 564.6,
  ownProgress: 564.6,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-iceland",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-iceland",
} as const satisfies GreatCourse
