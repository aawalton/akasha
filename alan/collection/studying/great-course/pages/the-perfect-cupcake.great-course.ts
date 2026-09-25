import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePerfectCupcake = {
  id: "019db533-f39f-772b-9aae-532dfa86b4f8",
  type: "page-type/great-course",
  slug: "the-perfect-cupcake",
  title: "The Perfect Cupcake",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 151.2,
  ownProgress: 151.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-perfect-cupcake",
      externalLink: "https://www.thegreatcoursesplus.com/the-perfect-cupcake",
    },
  ],
} as const satisfies GreatCourse
