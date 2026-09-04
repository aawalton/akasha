import type { GreatCourse } from "../../great-course.page-type.ts"

export const theItalianRenaissance = {
  id: "019db533-f39f-7c1e-870a-cbd594e1f6f4",
  pageTypeSlug: "great-course",
  slug: "the-italian-renaissance",
  title: "The Italian Renaissance",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1091.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-italian-renaissance",
  externalLink: "https://www.thegreatcoursesplus.com/the-italian-renaissance",
} as const satisfies GreatCourse
