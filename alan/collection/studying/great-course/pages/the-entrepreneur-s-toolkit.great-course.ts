import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEntrepreneurSToolkit = {
  id: "019db533-f39e-77f2-9765-65159dc440e3",
  type: "page-type/great-course",
  slug: "the-entrepreneur-s-toolkit",
  title: "The Entrepreneur's Toolkit",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 763.8,
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
      externalId: "the-entrepreneurs-toolkit",
      externalLink: "https://plus.thegreatcourses.com/the-entrepreneurs-toolkit",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
