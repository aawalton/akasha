import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEnglishNovel = {
  id: "019db533-f387-7fbd-b1e7-2abb5ea63b34",
  type: "page-type/great-course",
  slug: "the-english-novel",
  title: "The English Novel",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.95,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-english-novel",
      externalLink: "https://plus.thegreatcourses.com/the-english-novel",
    },
  ],
  createdAt: "2026-04-22T12:39:34.023Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
