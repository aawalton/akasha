import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theApocryphalJesus = {
  id: "019db533-f39e-7c79-95f0-3b909c52b4c7",
  type: "page-type/great-course",
  slug: "the-apocryphal-jesus",
  title: "The Apocryphal Jesus",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-apocryphal-jesus",
      externalLink: "https://plus.thegreatcourses.com/the-apocryphal-jesus",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
