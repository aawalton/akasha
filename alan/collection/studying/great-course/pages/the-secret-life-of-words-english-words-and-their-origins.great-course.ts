import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSecretLifeOfWordsEnglishWordsAndTheirOrigins = {
  id: "019db533-f39e-764d-8a44-947485006fac",
  type: "page-type/great-course",
  slug: "the-secret-life-of-words-english-words-and-their-origins",
  title: "The Secret Life of Words: English Words and Their Origins",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1101.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-secret-life-of-words-english-words-and-their-origins",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-secret-life-of-words-english-words-and-their-origins",
    },
  ],
} as const satisfies GreatCourse
