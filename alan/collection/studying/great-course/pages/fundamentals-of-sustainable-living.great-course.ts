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
      externalLink: "https://www.thegreatcoursesplus.com/fundamentals-of-sustainable-living",
    },
  ],
} as const satisfies GreatCourse
