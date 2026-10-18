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
      externalLink: "https://plus.thegreatcourses.com/do-it-yourself-engineering",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
