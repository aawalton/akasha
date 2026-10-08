import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureMythsOfLearningAndMemory = {
  id: "019db533-f39f-713f-b049-4f0d039b0aa8",
  type: "page-type/great-course",
  slug: "pilot-lecture-myths-of-learning-and-memory",
  title: "Pilot Lecture: Myths of Learning and Memory",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 27,
  ownProgress: 27,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "myths-of-learning-and-memory",
      externalLink: "https://www.thegreatcoursesplus.com/myths-of-learning-and-memory",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
