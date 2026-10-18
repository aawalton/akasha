import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheWorldSGreatestStructures = {
  id: "019db533-f39f-7b5e-b9bf-ff972673d9d8",
  type: "page-type/great-course",
  slug: "understanding-the-world-s-greatest-structures",
  title: "Understanding the World's Greatest Structures",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 765.6,
  ownProgress: 765.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-worlds-greatest-structures",
      externalLink: "https://plus.thegreatcourses.com/understanding-the-worlds-greatest-structures",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
