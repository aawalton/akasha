import type { GreatCourse } from "../../great-course.page-type.ts"

export const theEverydayGuideToWine = {
  id: "019db533-f39f-7892-ac68-1d89c8812020",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-everyday-guide-to-wine",
  title: "The Everyday Guide to Wine",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 752.4,
  ownProgress: 752.4,
  partOfCollections: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "the-everyday-guide-to-wine",
  externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wine",
} as const satisfies GreatCourse
