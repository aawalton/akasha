import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theOldTestament = {
  id: "019db533-f39e-7a0c-827f-e8b3b047d071",
  type: "page-type/great-course",
  slug: "the-old-testament",
  title: "The Old Testament",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-old-testament",
      externalLink: "https://plus.thegreatcourses.com/the-old-testament",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
