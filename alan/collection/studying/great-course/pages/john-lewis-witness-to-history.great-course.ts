import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const johnLewisWitnessToHistory = {
  id: "019db533-f3a0-70ea-b306-6ff7bf727d4d",
  type: "page-type/great-course",
  slug: "john-lewis-witness-to-history",
  title: "John Lewis: Witness to History",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 28.8,
  ownProgress: 28.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "john-lewis-witness-to-history",
      externalLink: "https://plus.thegreatcourses.com/john-lewis-witness-to-history",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
