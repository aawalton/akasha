import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterMeditations = {
  id: "019db533-f39e-7b20-a816-8ba669f4daa7",
  type: "page-type/great-course",
  slug: "books-that-matter-meditations",
  title: "Books That Matter: Meditations",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 362.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-meditations",
      externalLink: "https://plus.thegreatcourses.com/books-that-matter-meditations",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
