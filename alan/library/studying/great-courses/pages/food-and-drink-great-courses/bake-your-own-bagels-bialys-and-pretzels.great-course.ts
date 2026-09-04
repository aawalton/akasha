import type { GreatCourse } from "../../great-course.page-type.ts"

export const bakeYourOwnBagelsBialysAndPretzels = {
  id: "019db533-f39f-7b08-a2e8-fa4f09ab801c",
  pageTypeSlug: "great-course",
  slug: "bake-your-own-bagels-bialys-and-pretzels",
  title: "Bake Your Own Bagels, Bialys & Pretzels",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 113.4,
  ownProgress: 113.4,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "bake-your-own-bagels-bialys-pretzels",
  externalLink: "https://www.thegreatcoursesplus.com/bake-your-own-bagels-bialys-pretzels",
} as const satisfies GreatCourse
