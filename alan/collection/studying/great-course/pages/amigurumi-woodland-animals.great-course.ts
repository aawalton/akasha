import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const amigurumiWoodlandAnimals = {
  id: "019db533-f39e-768c-a22b-b8ac0d8b25df",
  type: "page-type/great-course",
  slug: "amigurumi-woodland-animals",
  title: "Amigurumi: Woodland Animals",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 287.4,
  ownProgress: 287.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "amigurumi-woodland-animals",
      externalLink: "https://www.thegreatcoursesplus.com/amigurumi-woodland-animals",
    },
  ],
} as const satisfies GreatCourse
