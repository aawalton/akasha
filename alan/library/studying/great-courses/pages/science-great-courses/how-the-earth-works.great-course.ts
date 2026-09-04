import type { GreatCourse } from "../../great-course.page-type.ts"

export const howTheEarthWorks = {
  id: "019db533-f39e-7ed9-bd14-4d00da5be3ea",
  pageTypeSlug: "great-course",
  slug: "how-the-earth-works",
  title: "How the Earth Works",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1481.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "how-the-earth-works",
  externalLink: "https://www.thegreatcoursesplus.com/how-the-earth-works",
} as const satisfies GreatCourse
