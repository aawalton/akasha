import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const becomingAGreatEssayist = {
  id: "019db533-f39e-7784-a3ca-6d5c15ee1402",
  type: "page-type/great-course",
  slug: "becoming-a-great-essayist",
  title: "Becoming a Great Essayist",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 744.6,
  ownProgress: 744.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "becoming-a-great-essayist",
      externalLink: "https://www.thegreatcoursesplus.com/becoming-a-great-essayist",
    },
  ],
} as const satisfies GreatCourse
