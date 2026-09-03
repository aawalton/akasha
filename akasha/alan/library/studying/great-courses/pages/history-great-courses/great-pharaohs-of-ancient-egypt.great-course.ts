import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatPharaohsOfAncientEgypt = {
  id: "019db533-f3a0-7188-b214-31f28e7b4766",
  pageTypeSlug: "great-course",
  slug: "great-pharaohs-of-ancient-egypt",
  title: "Great Pharaohs of Ancient Egypt",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 367.2,
  ownProgress: 367.2,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "great-pharaohs-of-ancient-egypt",
  externalLink: "https://www.thegreatcoursesplus.com/great-pharaohs-of-ancient-egypt",
} as const satisfies GreatCourse
