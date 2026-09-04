import type { GreatCourse } from "../../great-course.page-type.ts"

export const myFavoriteUniverse = {
  id: "019db533-f39e-7f38-be6b-74b0931e3e7c",
  pageTypeSlug: "great-course",
  slug: "my-favorite-universe",
  title: "My Favorite Universe",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 388.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "my-favorite-universe",
  externalLink: "https://www.thegreatcoursesplus.com/my-favorite-universe",
} as const satisfies GreatCourse
