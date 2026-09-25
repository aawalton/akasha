import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theUltimateTShirtQuilt = {
  id: "019db533-f39e-745d-b564-7b4cfa93d604",
  type: "page-type/great-course",
  slug: "the-ultimate-t-shirt-quilt",
  title: "The Ultimate T-Shirt Quilt",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 147.6,
  ownProgress: 147.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-ultimate-t-shirt-quilt",
      externalLink: "https://www.thegreatcoursesplus.com/the-ultimate-t-shirt-quilt",
    },
  ],
} as const satisfies GreatCourse
