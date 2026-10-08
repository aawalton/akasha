import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theIndustrialRevolution = {
  id: "019db533-f39f-7ce6-8726-306d991b91f9",
  type: "page-type/great-course",
  slug: "the-industrial-revolution",
  title: "The Industrial Revolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1100.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-industrial-revolution",
      externalLink: "https://www.thegreatcoursesplus.com/the-industrial-revolution",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
