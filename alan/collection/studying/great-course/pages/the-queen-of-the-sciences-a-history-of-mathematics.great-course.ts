import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theQueenOfTheSciencesAHistoryOfMathematics = {
  id: "019db533-f3a0-727a-878d-6786beed99cb",
  type: "page-type/great-course",
  slug: "the-queen-of-the-sciences-a-history-of-mathematics",
  title: "The Queen of the Sciences: A History of Mathematics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-queen-of-the-sciences-a-history-of-mathematics",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-queen-of-the-sciences-a-history-of-mathematics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
