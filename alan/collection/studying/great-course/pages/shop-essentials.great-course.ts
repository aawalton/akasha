import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const shopEssentials = {
  id: "019db533-f39e-7657-86f5-a7d141ff0c72",
  type: "page-type/great-course",
  slug: "shop-essentials",
  title: "Shop Essentials",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 201.6,
  ownProgress: 201.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "shop-essentials",
      externalLink: "https://www.thegreatcoursesplus.com/shop-essentials",
    },
  ],
} as const satisfies GreatCourse
