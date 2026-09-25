import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheUsGovernment = {
  id: "019db533-f3a0-7052-bfc9-bb44683dce2d",
  type: "page-type/great-course",
  slug: "understanding-the-us-government",
  title: "Understanding the US Government",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 744.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-us-government",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-us-government",
    },
  ],
} as const satisfies GreatCourse
