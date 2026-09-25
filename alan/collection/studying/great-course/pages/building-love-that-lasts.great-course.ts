import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const buildingLoveThatLasts = {
  id: "019db533-f39e-7774-bb14-9dff48d0323d",
  type: "page-type/great-course",
  slug: "building-love-that-lasts",
  title: "Building Love That Lasts",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 352.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "building-love-that-lasts",
      externalLink: "https://www.thegreatcoursesplus.com/building-love-that-lasts",
    },
  ],
} as const satisfies GreatCourse
