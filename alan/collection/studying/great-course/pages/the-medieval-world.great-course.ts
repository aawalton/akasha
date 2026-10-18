import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMedievalWorld = {
  id: "019db533-f39f-7827-8da2-b9ea783d24c1",
  type: "page-type/great-course",
  slug: "the-medieval-world",
  title: "The Medieval World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-medieval-world",
      externalLink: "https://plus.thegreatcourses.com/the-medieval-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
