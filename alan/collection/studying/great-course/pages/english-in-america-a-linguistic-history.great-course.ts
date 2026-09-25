import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const englishInAmericaALinguisticHistory = {
  id: "019db533-f39e-79ee-8b86-3889421b73d0",
  type: "page-type/great-course",
  slug: "english-in-america-a-linguistic-history",
  title: "English in America: A Linguistic History",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 356.4,
  ownProgress: 356.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "english-in-america-a-linguistic-history",
      externalLink: "https://www.thegreatcoursesplus.com/english-in-america-a-linguistic-history",
    },
  ],
} as const satisfies GreatCourse
