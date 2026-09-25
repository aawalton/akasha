import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const reconsideringJfk = {
  id: "019db533-f3a0-70ae-9302-f3208b39a1b3",
  type: "page-type/great-course",
  slug: "reconsidering-jfk",
  title: "Reconsidering JFK",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 358.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "reconsidering-jfk",
      externalLink: "https://www.thegreatcoursesplus.com/reconsidering-jfk",
    },
  ],
} as const satisfies GreatCourse
