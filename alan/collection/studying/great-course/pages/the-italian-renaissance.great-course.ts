import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theItalianRenaissance = {
  id: "019db533-f39f-7c1e-870a-cbd594e1f6f4",
  type: "page-type/great-course",
  slug: "the-italian-renaissance",
  title: "The Italian Renaissance",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1091.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-italian-renaissance",
      externalLink: "https://www.thegreatcoursesplus.com/the-italian-renaissance",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
