import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const essentialTechniquesEveryKnitterShouldKnow = {
  id: "019db533-f39e-748b-96e4-8856679b7aa6",
  type: "page-type/great-course",
  slug: "essential-techniques-every-knitter-should-know",
  title: "Essential Techniques Every Knitter Should Know",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 202.2,
  ownProgress: 202.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "essential-techniques-every-knitter-should-know",
      externalLink:
        "https://www.thegreatcoursesplus.com/essential-techniques-every-knitter-should-know",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
