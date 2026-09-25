import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingThePeriodicTable = {
  id: "019db533-f39f-709f-9e5e-2624fd586058",
  type: "page-type/great-course",
  slug: "understanding-the-periodic-table",
  title: "Understanding the Periodic Table",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 742.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-periodic-table",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-periodic-table",
    },
  ],
} as const satisfies GreatCourse
