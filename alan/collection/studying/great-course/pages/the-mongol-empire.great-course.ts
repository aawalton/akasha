import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMongolEmpire = {
  id: "019db533-f39f-7c29-9aa7-899cb31b4857",
  type: "page-type/great-course",
  slug: "the-mongol-empire",
  title: "The Mongol Empire",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 693.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mongol-empire",
      externalLink: "https://plus.thegreatcourses.com/the-mongol-empire",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
