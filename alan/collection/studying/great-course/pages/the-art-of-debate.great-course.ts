import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfDebate = {
  id: "019db533-f39e-7299-8507-079d12f31d21",
  type: "page-type/great-course",
  slug: "the-art-of-debate",
  title: "The Art of Debate",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 709.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-debate",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-debate",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
