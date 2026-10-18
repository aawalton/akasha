import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterTheAnalectsOfConfucius = {
  id: "019db533-f39e-7c97-9e13-f3fccf3179a2",
  type: "page-type/great-course",
  slug: "books-that-matter-the-analects-of-confucius",
  title: "Books That Matter: The Analects of Confucius",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 718.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-the-analects-of-confucius",
      externalLink: "https://plus.thegreatcourses.com/books-that-matter-the-analects-of-confucius",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
