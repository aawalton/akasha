import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historyOfTheEnglishLanguage2ndEdition = {
  id: "019db533-f39f-7676-9a72-272dc66706c7",
  type: "page-type/great-course",
  slug: "history-of-the-english-language-2nd-edition",
  title: "History of the English Language, 2nd Edition",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1101,
  ownProgress: 1101,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-the-english-language-2nd-edition",
      externalLink:
        "https://www.thegreatcoursesplus.com/history-of-the-english-language-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
