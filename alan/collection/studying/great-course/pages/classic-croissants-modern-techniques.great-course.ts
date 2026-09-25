import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicCroissantsModernTechniques = {
  id: "019db533-f39f-7a7e-9378-e91ff13dad62",
  type: "page-type/great-course",
  slug: "classic-croissants-modern-techniques",
  title: "Classic Croissants, Modern Techniques",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 108,
  ownProgress: 108,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classic-croissants-modern-techniques",
      externalLink: "https://www.thegreatcoursesplus.com/classic-croissants-modern-techniques",
    },
  ],
} as const satisfies GreatCourse
