import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingComplexity = {
  id: "019db533-f39e-7bc7-8143-8e4f0993aa6d",
  type: "page-type/great-course",
  slug: "understanding-complexity",
  title: "Understanding Complexity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 387.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-complexity",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-complexity",
    },
  ],
} as const satisfies GreatCourse
