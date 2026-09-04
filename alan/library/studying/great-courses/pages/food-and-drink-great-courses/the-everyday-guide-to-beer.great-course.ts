import type { GreatCourse } from "../../great-course.page-type.ts"

export const theEverydayGuideToBeer = {
  id: "019db533-f39f-783d-8e04-7d77c0c67c4b",
  pageTypeSlug: "great-course",
  slug: "the-everyday-guide-to-beer",
  title: "The Everyday Guide to Beer",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 340.2,
  ownProgress: 340.2,
  partOfSlugs: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "the-everyday-guide-to-beer",
  externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-beer",
} as const satisfies GreatCourse
