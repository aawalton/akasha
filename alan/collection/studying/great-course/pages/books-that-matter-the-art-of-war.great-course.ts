import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterTheArtOfWar = {
  id: "01a06578-671c-7001-8a6b-0a532e89a9ab",
  type: "page-type/great-course",
  slug: "books-that-matter-the-art-of-war",
  title: "Books That Matter: The Art of War",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-the-art-of-war",
      externalLink: "https://plus.thegreatcourses.com/books-that-matter-the-art-of-war",
    },
  ],
  createdAt: "2026-09-03T04:13:04.668Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
