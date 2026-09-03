import type { GreatCourse } from "../../great-course.page-type.ts"

export const theVikings = {
  id: "019db533-f3a0-7281-9c99-294ae9b27f47",
  pageTypeSlug: "great-course",
  slug: "the-vikings",
  title: "The Vikings",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1108.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-vikings",
  externalLink: "https://www.thegreatcoursesplus.com/the-vikings",
} as const satisfies GreatCourse
