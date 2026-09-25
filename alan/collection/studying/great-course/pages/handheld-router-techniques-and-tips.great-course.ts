import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const handheldRouterTechniquesAndTips = {
  id: "019db533-f39e-7727-a7f3-1397e0367ee2",
  type: "page-type/great-course",
  slug: "handheld-router-techniques-and-tips",
  title: "Handheld Router Techniques and Tips",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 205.2,
  ownProgress: 205.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "handheld-router-techniques-and-tips",
      externalLink: "https://www.thegreatcoursesplus.com/handheld-router-techniques-and-tips",
    },
  ],
} as const satisfies GreatCourse
