import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCelticWorld = {
  id: "019db533-f3a0-70c8-b3e5-fb4a51b050cc",
  type: "page-type/great-course",
  slug: "the-celtic-world",
  title: "The Celtic World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 775.8,
  ownProgress: 775.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-celtic-world",
      externalLink: "https://plus.thegreatcourses.com/the-celtic-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
