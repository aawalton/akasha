import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const languageAToZ = {
  id: "019db533-f39f-74ae-add2-f190ca8b03d3",
  type: "page-type/great-course",
  slug: "language-a-to-z",
  title: "Language A to Z",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 374.4,
  ownProgress: 374.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "language-a-to-z",
      externalLink: "https://www.thegreatcoursesplus.com/language-a-to-z",
    },
  ],
} as const satisfies GreatCourse
