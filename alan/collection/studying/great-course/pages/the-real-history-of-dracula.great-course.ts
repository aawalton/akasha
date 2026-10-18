import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRealHistoryOfDracula = {
  id: "019db533-f3a0-7057-bbdb-543993d464e7",
  type: "page-type/great-course",
  slug: "the-real-history-of-dracula",
  title: "The Real History of Dracula",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 270,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-real-history-of-dracula",
      externalLink: "https://plus.thegreatcourses.com/the-real-history-of-dracula",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
