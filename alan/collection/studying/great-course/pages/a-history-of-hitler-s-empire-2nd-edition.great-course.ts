import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistoryOfHitlerSEmpire2ndEdition = {
  id: "019db533-f39f-7ae8-9272-740bfec53829",
  type: "page-type/great-course",
  slug: "a-history-of-hitler-s-empire-2nd-edition",
  title: "A History of Hitler's Empire, 2nd Edition",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 381,
  ownProgress: 381,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-history-of-hitlers-empire-2nd-edition",
      externalLink: "https://www.thegreatcoursesplus.com/a-history-of-hitlers-empire-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
