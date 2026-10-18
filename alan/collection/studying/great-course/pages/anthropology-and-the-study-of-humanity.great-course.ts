import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const anthropologyAndTheStudyOfHumanity = {
  id: "019db533-f39f-7f62-802a-4a787423b9f0",
  type: "page-type/great-course",
  slug: "anthropology-and-the-study-of-humanity",
  title: "Anthropology and the Study of Humanity",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 720.6,
  ownProgress: 720.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "anthropology-and-the-study-of-humanity",
      externalLink: "https://plus.thegreatcourses.com/anthropology-and-the-study-of-humanity",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
