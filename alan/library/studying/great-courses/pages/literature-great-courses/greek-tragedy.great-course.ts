import type { GreatCourse } from "../../great-course.page-type.ts"

export const greekTragedy = {
  id: "019db533-f39e-7912-bd35-17806a00eefe",
  pageTypeSlug: "great-course",
  slug: "greek-tragedy",
  title: "Greek Tragedy",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "greek-tragedy",
  externalLink: "https://www.thegreatcoursesplus.com/greek-tragedy",
} as const satisfies GreatCourse
