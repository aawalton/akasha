import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRiseOfCommunismFromMarxToLenin = {
  id: "019db533-f3a0-702a-9b58-b964c9556a32",
  type: "page-type/great-course",
  slug: "the-rise-of-communism-from-marx-to-lenin",
  title: "The Rise of Communism: From Marx to Lenin",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 335.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-rise-of-communism-from-mar-to-lenin",
      externalLink: "https://www.thegreatcoursesplus.com/the-rise-of-communism-from-mar-to-lenin",
    },
  ],
} as const satisfies GreatCourse
