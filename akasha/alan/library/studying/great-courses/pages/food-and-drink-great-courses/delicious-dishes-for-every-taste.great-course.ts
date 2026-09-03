import type { GreatCourse } from "../../great-course.page-type.ts"

export const deliciousDishesForEveryTaste = {
  id: "019db533-f39f-79fe-9734-1d1fd8370315",
  pageTypeSlug: "great-course",
  slug: "delicious-dishes-for-every-taste",
  title: "Delicious Dishes for Every Taste",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 131.4,
  ownProgress: 131.4,
  partOfSlugs: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "delicious-dishes-for-every-taste",
  externalLink: "https://www.thegreatcoursesplus.com/delicious-dishes-for-every-taste",
} as const satisfies GreatCourse
