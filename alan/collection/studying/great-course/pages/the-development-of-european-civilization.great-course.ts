import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theDevelopmentOfEuropeanCivilization = {
  id: "019db533-f39f-7d45-9374-dbeb7902154c",
  type: "page-type/great-course",
  slug: "the-development-of-european-civilization",
  title: "The Development of European Civilization",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1472.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-development-of-european-civilization",
      externalLink: "https://plus.thegreatcourses.com/the-development-of-european-civilization",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
