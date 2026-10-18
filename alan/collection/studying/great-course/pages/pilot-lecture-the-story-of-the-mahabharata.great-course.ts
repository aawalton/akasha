import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheStoryOfTheMahabharata = {
  id: "019db533-f39e-78c6-8d2d-6f7f1133c8f1",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-story-of-the-mahabharata",
  title: "Pilot Lecture: The Story of the Mahabharata",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 31.2,
  ownProgress: 31.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-the-story-of-mahabharata",
      externalLink: "https://plus.thegreatcourses.com/wondrium-pilots-the-story-of-mahabharata",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
