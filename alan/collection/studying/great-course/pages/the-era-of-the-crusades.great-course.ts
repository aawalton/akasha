import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEraOfTheCrusades = {
  id: "01a06578-6718-7004-8c0e-9fb556882dbd",
  type: "page-type/great-course",
  slug: "the-era-of-the-crusades",
  title: "The Era of the Crusades",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-era-of-the-crusades",
      externalLink: "https://plus.thegreatcourses.com/the-era-of-the-crusades",
    },
  ],
} as const satisfies GreatCourse
