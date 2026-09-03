import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAgeOfBenjaminFranklin = {
  id: "019db533-f39f-7d3a-a52f-86ba8f044a58",
  pageTypeSlug: "great-course",
  slug: "the-age-of-benjamin-franklin",
  title: "The Age of Benjamin Franklin",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 758.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-age-of-benjamin-franklin",
  externalLink: "https://www.thegreatcoursesplus.com/the-age-of-benjamin-franklin",
} as const satisfies GreatCourse
