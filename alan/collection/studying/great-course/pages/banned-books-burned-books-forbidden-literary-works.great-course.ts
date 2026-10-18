import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bannedBooksBurnedBooksForbiddenLiteraryWorks = {
  id: "019db533-f39e-79fc-ad7f-fda55273facf",
  type: "page-type/great-course",
  slug: "banned-books-burned-books-forbidden-literary-works",
  title: "Banned Books, Burned Books: Forbidden Literary Works",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 782.4,
  ownProgress: 782.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "banned-books-burned-books-forbidden-literary-works",
      externalLink:
        "https://plus.thegreatcourses.com/banned-books-burned-books-forbidden-literary-works",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
