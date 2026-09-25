import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const homemadeHolidayBreads = {
  id: "019db533-f39f-7928-93be-179116ac183c",
  type: "page-type/great-course",
  slug: "homemade-holiday-breads",
  title: "Homemade Holiday Breads",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 119.4,
  ownProgress: 119.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "homemade-holiday-breads",
      externalLink: "https://www.thegreatcoursesplus.com/homemade-holiday-breads",
    },
  ],
} as const satisfies GreatCourse
