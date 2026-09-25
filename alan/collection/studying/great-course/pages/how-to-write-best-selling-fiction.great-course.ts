import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToWriteBestSellingFiction = {
  id: "019db533-f39e-7890-be55-a3b4d0121c1e",
  type: "page-type/great-course",
  slug: "how-to-write-best-selling-fiction",
  title: "How to Write Best-Selling Fiction",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 792,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-write-best-selling-fiction",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-write-best-selling-fiction",
    },
  ],
} as const satisfies GreatCourse
