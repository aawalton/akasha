import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const theOldTestament = {
  id: "019db533-f39e-7a0c-827f-e8b3b047d071",
  type: "great-course",
  slug: "the-old-testament",
  title: "The Old Testament",
  status: "not-started",
  unit: "minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-old-testament",
  externalLink: "https://www.thegreatcoursesplus.com/the-old-testament",
} as const satisfies GreatCourse
