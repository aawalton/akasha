import type { GreatCourse } from "../../great-course.page-type.ts"

export const theOldTestament = {
  id: "019db533-f39e-7a0c-827f-e8b3b047d071",
  pageTypeSlug: "great-course",
  slug: "the-old-testament",
  title: "The Old Testament",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-old-testament",
  externalLink: "https://www.thegreatcoursesplus.com/the-old-testament",
} as const satisfies GreatCourse
