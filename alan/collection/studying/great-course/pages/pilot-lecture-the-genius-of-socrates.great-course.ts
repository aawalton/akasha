import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheGeniusOfSocrates = {
  id: "019db533-f39e-7a3e-9e9c-49f01a2683a1",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-genius-of-socrates",
  title: "Pilot Lecture: The Genius of Socrates",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 26.4,
  ownProgress: 26.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-genius-of-socrates",
      externalLink: "https://plus.thegreatcourses.com/pilot-lecture-the-genius-of-socrates",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
