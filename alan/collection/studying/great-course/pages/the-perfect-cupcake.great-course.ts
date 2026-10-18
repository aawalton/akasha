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
      externalLink: "https://plus.thegreatcourses.com/the-perfect-cupcake",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
