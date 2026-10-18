import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lawSchoolForEveryone = {
  id: "019db533-f39e-7a55-8120-72daf4ecbe04",
  type: "page-type/great-course",
  slug: "law-school-for-everyone",
  title: "Law School for Everyone",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1522.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "law-school-for-everyone",
      externalLink: "https://plus.thegreatcourses.com/law-school-for-everyone",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
