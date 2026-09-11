import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const homemadeHolidayBreads = {
  id: "019db533-f39f-7928-93be-179116ac183c",
  type: "great-course",
  slug: "homemade-holiday-breads",
  title: "Homemade Holiday Breads",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 119.4,
  ownProgress: 119.4,
  partOfCollections: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "homemade-holiday-breads",
  externalLink: "https://www.thegreatcoursesplus.com/homemade-holiday-breads",
} as const satisfies GreatCourse
