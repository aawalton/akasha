import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greek101LearningAnAncientLanguage = {
  id: "019db533-f39f-7e58-be3e-9375920dcc65",
  type: "page-type/great-course",
  slug: "greek-101-learning-an-ancient-language",
  title: "Greek 101: Learning an Ancient Language",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1110,
  ownProgress: 1110,
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
      externalId: "greek-101-learning-an-ancient-language",
      externalLink: "https://www.thegreatcoursesplus.com/greek-101-learning-an-ancient-language",
    },
  ],
} as const satisfies GreatCourse
