import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const monstersWithin = {
  id: "019db533-f39f-78b3-b304-b2f44f476574",
  type: "page-type/great-course",
  slug: "monsters-within",
  title: "Monsters Within ...",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 104.4,
  ownProgress: 104.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "monsters-within",
      externalLink: "https://plus.thegreatcourses.com/monsters-within",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
