import type { GreatCourse } from "../great-course.page-type.ts"

export const theEverydayGuideToWinesOfItaly = {
  id: "019db533-f39f-793e-9748-31d6424798fb",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-everyday-guide-to-wines-of-italy",
  title: "The Everyday Guide to Wines of Italy",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 209.4,
  ownProgress: 209.4,
  partOfCollections: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "the-everyday-guide-to-wines-of-italy",
  externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wines-of-italy",
} as const satisfies GreatCourse
