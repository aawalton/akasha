import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const monstersWithin = {
  id: "019db533-f39f-78b3-b304-b2f44f476574",
  type: "page-type/great-course",
  slug: "monsters-within",
  title: "Monsters Within ...",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 104.4,
  ownProgress: 104.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "monsters-within",
      externalLink: "https://www.thegreatcoursesplus.com/monsters-within",
    },
  ],
} as const satisfies GreatCourse
