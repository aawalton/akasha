import type { GreatCourse } from "../../great-course.page-type.ts"

export const mythInHumanHistory = {
  id: "019db533-f39e-7819-bb53-0c6c84cfdcfc",
  pageTypeSlug: "great-course",
  slug: "myth-in-human-history",
  title: "Myth in Human History",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1101,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "myth-in-human-history",
  externalLink: "https://www.thegreatcoursesplus.com/myth-in-human-history",
} as const satisfies GreatCourse
