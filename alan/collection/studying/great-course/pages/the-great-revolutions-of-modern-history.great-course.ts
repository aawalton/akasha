import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatRevolutionsOfModernHistory = {
  id: "019db533-f39f-7d6f-adbb-1b7583f5a972",
  type: "page-type/great-course",
  slug: "the-great-revolutions-of-modern-history",
  title: "The Great Revolutions of Modern History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 768,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-revolutions-of-modern-history",
      externalLink: "https://plus.thegreatcourses.com/the-great-revolutions-of-modern-history",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
