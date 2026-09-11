import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const theIliadOfHomer = {
  id: "019db533-f387-7f2f-bb50-aeaf129ac8ed",
  type: "great-course",
  slug: "the-iliad-of-homer",
  title: "The “Iliad” of Homer",
  status: "not-started",
  unit: "minutes",
  ownLength: 365.416667,
  ownProgress: 0,
  partOfCollections: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "the-iliad-of-homer",
  externalLink: "https://www.thegreatcoursesplus.com/the-iliad-of-homer",
} as const satisfies GreatCourse
