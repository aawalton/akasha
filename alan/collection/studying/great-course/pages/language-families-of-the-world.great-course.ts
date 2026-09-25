import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const languageFamiliesOfTheWorld = {
  id: "019db533-f39f-7502-b429-125aae6a616a",
  type: "page-type/great-course",
  slug: "language-families-of-the-world",
  title: "Language Families of the World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 957,
  ownProgress: 957,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "language-families-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/language-families-of-the-world",
    },
  ],
} as const satisfies GreatCourse
