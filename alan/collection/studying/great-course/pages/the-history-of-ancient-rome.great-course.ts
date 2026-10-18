import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfAncientRome = {
  id: "019db533-f39f-7cfb-b94a-f4ebdea69829",
  type: "page-type/great-course",
  slug: "the-history-of-ancient-rome",
  title: "The History of Ancient Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1451.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-ancient-rome",
      externalLink: "https://plus.thegreatcourses.com/the-history-of-ancient-rome",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
