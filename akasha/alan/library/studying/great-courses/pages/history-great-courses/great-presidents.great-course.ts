import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatPresidents = {
  id: "019db533-f3a0-7357-b2e5-de642c8382b2",
  pageTypeSlug: "great-course",
  slug: "great-presidents",
  title: "Great Presidents",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1482.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "great-presidents",
  externalLink: "https://www.thegreatcoursesplus.com/great-presidents",
} as const satisfies GreatCourse
