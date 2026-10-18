import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const worldWarIThe = {
  id: "019db533-f3a0-7256-b743-a2a933399fff",
  type: "page-type/great-course",
  slug: "world-war-i-the",
  title: "World War I: The",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1120.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "world-war-i-the-great-war",
      externalLink: "https://plus.thegreatcourses.com/world-war-i-the-great-war",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
