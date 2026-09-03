import type { GreatCourse } from "../../great-course.page-type.ts"

export const homemadeHolidayBreads = {
  id: "019db533-f39f-7928-93be-179116ac183c",
  pageTypeSlug: "great-course",
  slug: "homemade-holiday-breads",
  title: "Homemade Holiday Breads",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 119.4,
  ownProgress: 119.4,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "homemade-holiday-breads",
  externalLink: "https://www.thegreatcoursesplus.com/homemade-holiday-breads",
} as const satisfies GreatCourse
