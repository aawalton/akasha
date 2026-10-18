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
      externalLink: "https://plus.thegreatcourses.com/the-italian-renaissance",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
