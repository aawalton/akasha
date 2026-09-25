import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningSpanishHowToUnderstandAndSpeakANewLanguage = {
  id: "019db533-f39f-754c-b66a-d7f367c96d9d",
  type: "page-type/great-course",
  slug: "learning-spanish-how-to-understand-and-speak-a-new-language",
  title: "Learning Spanish: How to Understand and Speak a New Language",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1293.6,
  ownProgress: 1293.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-spanish-how-to-understand-and-speak-a-new-language",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-spanish-how-to-understand-and-speak-a-new-language",
    },
  ],
} as const satisfies GreatCourse
