import type { GreatCourse } from "../../great-course.page-type.ts"

export const mathAndMagic = {
  id: "019db533-f3a0-77fc-8ec6-32c4d954d64b",
  pageTypeSlug: "great-course",
  slug: "math-and-magic",
  title: "Math and Magic",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 388.2,
  ownProgress: 388.2,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "mathematics-great-courses",
  ],
  source: "the-great-courses",
  externalId: "math-and-magic",
  externalLink: "https://www.thegreatcoursesplus.com/math-and-magic",
} as const satisfies GreatCourse
