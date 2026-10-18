import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fundamentalsOfSustainableLiving = {
  id: "019db533-f39f-7274-b0be-797d495a15f4",
  type: "page-type/great-course",
  slug: "fundamentals-of-sustainable-living",
  title: "Fundamentals of Sustainable Living",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 364.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fundamentals-of-sustainable-living",
      externalLink: "https://plus.thegreatcourses.com/fundamentals-of-sustainable-living",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
