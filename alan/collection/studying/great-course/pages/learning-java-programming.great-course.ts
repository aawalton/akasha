import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningJavaProgramming = {
  id: "019db533-f39e-72b0-b9f1-d46d93939b61",
  type: "page-type/great-course",
  slug: "learning-java-programming",
  title: "Learning Java Programming",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 505.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-java-programming",
      externalLink: "https://plus.thegreatcourses.com/learning-java-programming",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
