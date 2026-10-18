import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMiddleAgesAroundTheWorld = {
  id: "019db533-f39f-7fa2-9a4c-8f8355b3c7a1",
  type: "page-type/great-course",
  slug: "the-middle-ages-around-the-world",
  title: "The Middle Ages around the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-middle-ages-around-the-world",
      externalLink: "https://plus.thegreatcourses.com/the-middle-ages-around-the-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
