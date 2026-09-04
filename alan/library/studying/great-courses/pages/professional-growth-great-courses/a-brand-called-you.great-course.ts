import type { GreatCourse } from "../../great-course.page-type.ts"

export const aBrandCalledYou = {
  id: "019db533-f39e-72f9-9792-73a20df2e75c",
  pageTypeSlug: "great-course",
  slug: "a-brand-called-you",
  title: "A Brand Called You",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 287.4,
  ownProgress: 287.4,
  partOfSlugs: ["all-great-courses", "professional-growth-great-courses"],
  source: "the-great-courses",
  externalId: "a-brand-called-you",
  externalLink: "https://www.thegreatcoursesplus.com/a-brand-called-you",
} as const satisfies GreatCourse
