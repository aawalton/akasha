import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterTheFederalistPapers = {
  id: "019db533-f3a0-71a6-9cd5-a22e459c5b3c",
  type: "page-type/great-course",
  slug: "books-that-matter-the-federalist-papers",
  title: "Books That Matter: The Federalist Papers",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 399.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-the-federalist-papers",
      externalLink: "https://www.thegreatcoursesplus.com/books-that-matter-the-federalist-papers",
    },
  ],
} as const satisfies GreatCourse
