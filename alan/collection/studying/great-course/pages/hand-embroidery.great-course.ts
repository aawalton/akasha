import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const handEmbroidery = {
  id: "019db533-f39e-7746-b5e4-30a18a126c38",
  type: "page-type/great-course",
  slug: "hand-embroidery",
  title: "Hand Embroidery",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 199.2,
  ownProgress: 199.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "hand-embroidery",
      externalLink: "https://www.thegreatcoursesplus.com/hand-embroidery",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
