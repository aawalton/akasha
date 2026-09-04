import type { GreatCourse } from "../../great-course.page-type.ts"

export const thePerfectCupcake = {
  id: "019db533-f39f-772b-9aae-532dfa86b4f8",
  pageTypeSlug: "great-course",
  slug: "the-perfect-cupcake",
  title: "The Perfect Cupcake",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 151.2,
  ownProgress: 151.2,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-perfect-cupcake",
  externalLink: "https://www.thegreatcoursesplus.com/the-perfect-cupcake",
} as const satisfies GreatCourse
