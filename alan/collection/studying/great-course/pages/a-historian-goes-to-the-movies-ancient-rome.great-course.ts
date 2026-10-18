import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistorianGoesToTheMoviesAncientRome = {
  id: "019db533-f3a0-723b-8734-66eb38075085",
  type: "page-type/great-course",
  slug: "a-historian-goes-to-the-movies-ancient-rome",
  title: "A Historian Goes to the Movies: Ancient Rome",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 392.4,
  ownProgress: 392.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-historian-goes-to-the-movies-ancient-rome",
      externalLink: "https://plus.thegreatcourses.com/a-historian-goes-to-the-movies-ancient-rome",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
