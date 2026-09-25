import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const handAppliedFinishing = {
  id: "019db533-f39e-75c2-97e2-2801de8e0653",
  type: "page-type/great-course",
  slug: "hand-applied-finishing",
  title: "Hand-Applied Finishing",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 141.6,
  ownProgress: 141.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "hand-applied-finishing",
      externalLink: "https://www.thegreatcoursesplus.com/hand-applied-finishing",
    },
  ],
} as const satisfies GreatCourse
