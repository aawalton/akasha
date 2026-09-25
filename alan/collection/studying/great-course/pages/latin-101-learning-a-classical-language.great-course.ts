import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const latin101LearningAClassicalLanguage = {
  id: "019db533-f39f-7e78-b1b0-0f0659247ad4",
  type: "page-type/great-course",
  slug: "latin-101-learning-a-classical-language",
  title: "Latin 101: Learning a Classical Language",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1098,
  ownProgress: 1098,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "latin-101-learning-a-classical-language",
      externalLink: "https://www.thegreatcoursesplus.com/latin-101-learning-a-classical-language",
    },
  ],
} as const satisfies GreatCourse
