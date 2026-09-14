import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const booksThatMatterMeditations = {
  id: "019db533-f39e-7b20-a816-8ba669f4daa7",
  type: "great-course",
  slug: "books-that-matter-meditations",
  title: "Books That Matter: Meditations",
  status: "not-started",
  unit: "minutes",
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
      externalLink: "https://www.thegreatcoursesplus.com/books-that-matter-meditations",
    },
  ],
} as const satisfies GreatCourse
