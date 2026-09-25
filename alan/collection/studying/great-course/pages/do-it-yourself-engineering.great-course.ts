import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const doItYourselfEngineering = {
  id: "019db533-f39f-7312-81f0-f0ff4860a84a",
  type: "page-type/great-course",
  slug: "do-it-yourself-engineering",
  title: "Do-It-Yourself Engineering",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 794.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "do-it-yourself-engineering",
      externalLink: "https://www.thegreatcoursesplus.com/do-it-yourself-engineering",
    },
  ],
} as const satisfies GreatCourse
