import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theVikings = {
  id: "019db533-f3a0-7281-9c99-294ae9b27f47",
  type: "page-type/great-course",
  slug: "the-vikings",
  title: "The Vikings",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1108.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-vikings",
      externalLink: "https://plus.thegreatcourses.com/the-vikings",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
