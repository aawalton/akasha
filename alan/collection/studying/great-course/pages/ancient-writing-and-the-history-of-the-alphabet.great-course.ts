import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ancientWritingAndTheHistoryOfTheAlphabet = {
  id: "019db533-f39e-79e0-a9ec-646b28692d70",
  type: "page-type/great-course",
  slug: "ancient-writing-and-the-history-of-the-alphabet",
  title: "Ancient Writing and the History of the Alphabet",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 381,
  ownProgress: 381,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ancient-writing-and-the-history-of-the-alphabet",
      externalLink:
        "https://www.thegreatcoursesplus.com/ancient-writing-and-the-history-of-the-alphabet",
    },
  ],
} as const satisfies GreatCourse
