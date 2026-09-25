import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatThinkersGreatTheorems = {
  id: "019db533-f3a0-7a2d-98a9-9a2ca25241cc",
  type: "page-type/great-course",
  slug: "great-thinkers-great-theorems",
  title: "Great Thinkers, Great Theorems",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-thinkers-great-theorems",
      externalLink: "https://www.thegreatcoursesplus.com/great-thinkers-great-theorems",
    },
  ],
} as const satisfies GreatCourse
