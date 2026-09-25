import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfThePictureBook = {
  id: "019db533-f389-717c-8cf1-cdc5c9f3ca94",
  type: "page-type/great-course",
  slug: "the-art-of-the-picture-book",
  title: "The Art of the Picture Book",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 163.716667,
  ownProgress: 163.716667,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-the-picture-book",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-the-picture-book",
    },
  ],
} as const satisfies GreatCourse
