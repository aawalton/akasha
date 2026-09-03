import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursWashingtonDc = {
  id: "019db533-f39f-7499-a294-72c07472331e",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-washington-dc",
  title: "The Great Tours: Washington DC",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 994.2,
  ownProgress: 994.2,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-washington-dc",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-washington-dc",
} as const satisfies GreatCourse
