import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startLateFinishRich = {
  id: "019db533-f39e-744f-83e2-d1b897defd0a",
  type: "page-type/great-course",
  slug: "start-late-finish-rich",
  title: "Start Late, Finish Rich",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 336,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "start-late-finish-rich",
      externalLink: "https://www.thegreatcoursesplus.com/start-late-finish-rich",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
