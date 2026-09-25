import type { GreatCoursesCollection } from "akasha/alan/collection/studying/great-courses-collection/great-courses-collection.page-type.types.ts"

export const theGreatCourses = {
  id: "019db533-f3a0-7af8-b549-248b004c0bf9",
  type: "page-type/great-courses-collection",
  slug: "the-great-courses",
  status: "not-applicable",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "the-great-courses",
      externalLink: "https://www.thegreatcourses.com/",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "The Great Courses",
} as const satisfies GreatCoursesCollection
