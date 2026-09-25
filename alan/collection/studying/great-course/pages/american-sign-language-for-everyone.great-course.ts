import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americanSignLanguageForEveryone = {
  id: "019db533-f39e-77e3-a05a-6cdba52ef750",
  type: "page-type/great-course",
  slug: "american-sign-language-for-everyone",
  title: "American Sign Language for Everyone",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 692.4,
  ownProgress: 692.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "american-sign-language-for-everyone",
      externalLink: "https://www.thegreatcoursesplus.com/american-sign-language-for-everyone",
    },
  ],
} as const satisfies GreatCourse
