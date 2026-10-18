import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const kingArthurHistoryAndLegend = {
  id: "019db533-f3a0-7349-8468-f2a44d6c7b1a",
  type: "page-type/great-course",
  slug: "king-arthur-history-and-legend",
  title: "King Arthur: History and Legend",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 723.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "king-arthur-history-and-legend",
      externalLink: "https://plus.thegreatcourses.com/king-arthur-history-and-legend",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
