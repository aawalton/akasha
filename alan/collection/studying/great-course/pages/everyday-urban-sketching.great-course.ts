import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const everydayUrbanSketching = {
  id: "019db533-f39e-757c-b74e-2aa3e63b0642",
  type: "page-type/great-course",
  slug: "everyday-urban-sketching",
  title: "Everyday Urban Sketching",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 719.4,
  ownProgress: 719.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "everyday-urban-sketching",
      externalLink: "https://plus.thegreatcourses.com/everyday-urban-sketching",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
