import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const getStartedWatercoloringFreshFlorals = {
  id: "019db533-f39f-7696-aa4e-b624b6eea1c4",
  type: "page-type/great-course",
  slug: "get-started-watercoloring-fresh-florals",
  title: "Get Started Watercoloring: Fresh Florals",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 123.6,
  ownProgress: 123.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "get-started-watercoloring-fresh-florals",
      externalLink: "https://www.thegreatcoursesplus.com/get-started-watercoloring-fresh-florals",
    },
  ],
} as const satisfies GreatCourse
