import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theNewTestament = {
  id: "019db533-f39e-79d9-9736-f652a0641dfb",
  type: "page-type/great-course",
  slug: "the-new-testament",
  title: "The New Testament",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-new-testament",
      externalLink: "https://www.thegreatcoursesplus.com/the-new-testament",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
