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
      externalLink: "https://plus.thegreatcourses.com/advanced-flaky-french-pastries",
    },
  ],
  createdAt: "2026-04-22T12:39:34.025Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
