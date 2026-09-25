import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const booksThatMatterTheCityOfGod = {
  id: "019db533-f39e-7b27-9ccf-5944a681db7a",
  type: "page-type/great-course",
  slug: "books-that-matter-the-city-of-god",
  title: "Books That Matter: The City of God",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 766.8,
  ownProgress: 766.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "books-that-matter-the-city-of-god",
      externalLink: "https://www.thegreatcoursesplus.com/books-that-matter-the-city-of-god",
    },
  ],
} as const satisfies GreatCourse
