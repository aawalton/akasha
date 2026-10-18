import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheOldTestament = {
  id: "019db533-f39e-7b97-93a0-e09d1a9f80eb",
  type: "page-type/great-course",
  slug: "understanding-the-old-testament",
  title: "Understanding the Old Testament",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 669.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-old-testament",
      externalLink: "https://plus.thegreatcourses.com/understanding-the-old-testament",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
