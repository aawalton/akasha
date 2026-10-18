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
      externalLink: "https://plus.thegreatcourses.com/homemade-holiday-breads",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
