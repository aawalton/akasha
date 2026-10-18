import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBookOfGenesis = {
  id: "019db533-f39e-7c0a-b532-0ec73722880f",
  type: "page-type/great-course",
  slug: "the-book-of-genesis",
  title: "The Book of Genesis",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 749.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-book-of-genesis",
      externalLink: "https://plus.thegreatcourses.com/the-book-of-genesis",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
