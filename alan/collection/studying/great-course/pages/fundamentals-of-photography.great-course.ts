import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fundamentalsOfPhotography = {
  id: "019db533-f39f-76a0-9570-95babf1c64f0",
  type: "page-type/great-course",
  slug: "fundamentals-of-photography",
  title: "Fundamentals of Photography",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 756,
  ownProgress: 756,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fundamentals-of-photography",
      externalLink: "https://www.thegreatcoursesplus.com/fundamentals-of-photography",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
