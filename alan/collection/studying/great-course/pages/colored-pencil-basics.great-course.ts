import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const coloredPencilBasics = {
  id: "019db533-f39f-768b-9e18-92f7216f9b1d",
  type: "page-type/great-course",
  slug: "colored-pencil-basics",
  title: "Colored Pencil Basics",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 643.2,
  ownProgress: 643.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "colored-pencil-basics",
      externalLink: "https://plus.thegreatcourses.com/colored-pencil-basics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
