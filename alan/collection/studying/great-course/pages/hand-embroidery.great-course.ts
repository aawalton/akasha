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
      externalLink: "https://plus.thegreatcourses.com/hand-embroidery",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
