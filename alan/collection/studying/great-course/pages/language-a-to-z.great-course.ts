import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const languageAToZ = {
  id: "019db533-f39f-74ae-add2-f190ca8b03d3",
  type: "page-type/great-course",
  slug: "language-a-to-z",
  title: "Language A to Z",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 374.4,
  ownProgress: 374.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "language-a-to-z",
      externalLink: "https://plus.thegreatcourses.com/language-a-to-z",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
