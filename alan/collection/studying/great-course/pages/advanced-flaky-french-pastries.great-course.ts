import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const advancedFlakyFrenchPastries = {
  id: "019db533-f389-7102-88bb-0ebebce57553",
  type: "page-type/great-course",
  slug: "advanced-flaky-french-pastries",
  title: "Advanced Flaky French Pastries",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 135.2,
  ownProgress: 135.2,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "advanced-flaky-french-pastries",
      externalLink: "https://www.thegreatcoursesplus.com/advanced-flaky-french-pastries",
    },
  ],
} as const satisfies GreatCourse
