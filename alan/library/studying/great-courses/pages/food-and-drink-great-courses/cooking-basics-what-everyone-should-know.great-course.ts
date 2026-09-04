import type { GreatCourse } from "../../great-course.page-type.ts"

export const cookingBasicsWhatEveryoneShouldKnow = {
  id: "019db533-f39f-79f3-8c84-e650cba5c7be",
  pageTypeSlug: "great-course",
  slug: "cooking-basics-what-everyone-should-know",
  title: "Cooking Basics: What Everyone Should Know",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 789.6,
  ownProgress: 789.6,
  partOfSlugs: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "cooking-basics-what-everyone-should-know",
  externalLink: "https://www.thegreatcoursesplus.com/cooking-basics-what-everyone-should-know",
} as const satisfies GreatCourse
