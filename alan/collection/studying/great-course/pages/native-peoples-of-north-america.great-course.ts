import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nativePeoplesOfNorthAmerica = {
  id: "019db533-f3a0-72d4-b6bd-3ec83332d6bf",
  type: "page-type/great-course",
  slug: "native-peoples-of-north-america",
  title: "Native Peoples of North America",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 767.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "native-peoples-of-north-america",
      externalLink: "https://www.thegreatcoursesplus.com/native-peoples-of-north-america",
    },
  ],
} as const satisfies GreatCourse
