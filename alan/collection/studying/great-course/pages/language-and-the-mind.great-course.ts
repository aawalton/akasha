import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const languageAndTheMind = {
  id: "019db533-f39e-7828-8f53-eca4a1a3e830",
  type: "page-type/great-course",
  slug: "language-and-the-mind",
  title: "Language and the Mind",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 720.6,
  ownProgress: 720.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "language-and-the-mind",
      externalLink: "https://plus.thegreatcourses.com/language-and-the-mind",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
