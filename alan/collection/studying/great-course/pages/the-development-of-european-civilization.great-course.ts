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
      externalLink: "https://www.thegreatcoursesplus.com/the-development-of-european-civilization",
    },
  ],
} as const satisfies GreatCourse
