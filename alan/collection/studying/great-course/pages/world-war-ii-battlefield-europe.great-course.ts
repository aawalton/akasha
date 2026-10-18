import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const worldWarIiBattlefieldEurope = {
  id: "019db533-f39f-7fb8-8a87-f7b30230b3bd",
  type: "page-type/great-course",
  slug: "world-war-ii-battlefield-europe",
  title: "World War II: Battlefield Europe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 681.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "world-war-ii-battlefield-europe",
      externalLink: "https://plus.thegreatcourses.com/world-war-ii-battlefield-europe",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
