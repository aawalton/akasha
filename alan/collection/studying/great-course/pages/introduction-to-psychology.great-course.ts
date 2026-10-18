import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToPsychology = {
  id: "019db533-f39f-7308-99dc-622b092fa6b7",
  type: "page-type/great-course",
  slug: "introduction-to-psychology",
  title: "Introduction to Psychology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1078.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-psychology",
      externalLink: "https://plus.thegreatcourses.com/introduction-to-psychology",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
