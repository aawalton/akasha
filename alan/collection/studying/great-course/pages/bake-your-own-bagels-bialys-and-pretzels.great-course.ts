import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bakeYourOwnBagelsBialysAndPretzels = {
  id: "019db533-f39f-7b08-a2e8-fa4f09ab801c",
  type: "page-type/great-course",
  slug: "bake-your-own-bagels-bialys-and-pretzels",
  title: "Bake Your Own Bagels, Bialys & Pretzels",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 113.4,
  ownProgress: 113.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "bake-your-own-bagels-bialys-pretzels",
      externalLink: "https://www.thegreatcoursesplus.com/bake-your-own-bagels-bialys-pretzels",
    },
  ],
} as const satisfies GreatCourse
