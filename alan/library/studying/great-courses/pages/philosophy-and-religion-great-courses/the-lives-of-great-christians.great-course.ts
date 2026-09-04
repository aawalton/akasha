import type { GreatCourse } from "../../great-course.page-type.ts"

export const theLivesOfGreatChristians = {
  id: "019db533-f39e-7bbf-90e9-d642516270ac",
  pageTypeSlug: "great-course",
  slug: "the-lives-of-great-christians",
  title: "The Lives of Great Christians",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 744.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-lives-of-great-christians",
  externalLink: "https://www.thegreatcoursesplus.com/the-lives-of-great-christians",
} as const satisfies GreatCourse
