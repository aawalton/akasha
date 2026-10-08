import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const williamShakespeareComediesHistoriesAndTragedies = {
  id: "019db533-f39e-76b4-88e6-ada363d26344",
  type: "page-type/great-course",
  slug: "william-shakespeare-comedies-histories-and-tragedies",
  title: "William Shakespeare: Comedies, Histories, and Tragedies",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1093.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "william-shakespeare-comedies-histories-and-tragedies",
      externalLink:
        "https://www.thegreatcoursesplus.com/william-shakespeare-comedies-histories-and-tragedies",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
