import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const solvingForZero = {
  id: "019db533-f39f-723f-a769-b67d61071362",
  type: "page-type/great-course",
  slug: "solving-for-zero",
  title: "Solving for Zero",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 68.4,
  ownProgress: 68.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "solving-for-zero",
      externalLink: "https://plus.thegreatcourses.com/solving-for-zero",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
