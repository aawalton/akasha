import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatCastlesOfEurope = {
  id: "019db533-f3a0-716c-83cc-bf0aad693508",
  pageTypeSlug: "great-course",
  slug: "great-castles-of-europe",
  title: "Great Castles of Europe",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 767.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "great-castles-of-europe",
  externalLink: "https://www.thegreatcoursesplus.com/great-castles-of-europe",
} as const satisfies GreatCourse
