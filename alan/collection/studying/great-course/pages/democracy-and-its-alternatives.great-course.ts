import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const democracyAndItsAlternatives = {
  id: "019db533-f3a0-719c-b59e-7cf0c8a58cc3",
  type: "page-type/great-course",
  slug: "democracy-and-its-alternatives",
  title: "Democracy and Its Alternatives",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 546,
  ownProgress: 546,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "democracy-and-its-alternatives",
      externalLink: "https://plus.thegreatcourses.com/democracy-and-its-alternatives",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
