import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const knitting101 = {
  id: "019db533-f39e-7736-8d09-108d55783bc0",
  type: "page-type/great-course",
  slug: "knitting-101",
  title: "Knitting 101",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 635.4,
  ownProgress: 635.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "knitting-101",
      externalLink: "https://www.thegreatcoursesplus.com/knitting-101",
    },
  ],
} as const satisfies GreatCourse
