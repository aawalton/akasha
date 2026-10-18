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
    },
  ],
  title: "The Great Courses",
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T20:04:08.433Z",
} as const satisfies GreatCoursesCollection
