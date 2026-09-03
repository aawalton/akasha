import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAgeOfHenryViii = {
  id: "019db533-f3a0-70b3-b046-c4bdaf7cc924",
  pageTypeSlug: "great-course",
  slug: "the-age-of-henry-viii",
  title: "The Age of Henry VIII",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 736.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-age-of-henry-viii",
  externalLink: "https://www.thegreatcoursesplus.com/the-age-of-henry-viii",
} as const satisfies GreatCourse
