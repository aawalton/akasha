import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const secretsOfTheOccult = {
  id: "019db533-f39f-7d99-aec4-7beb1b6686bc",
  type: "page-type/great-course",
  slug: "secrets-of-the-occult",
  title: "Secrets of the Occult",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 709.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "secrets-of-the-occult",
      externalLink: "https://www.thegreatcoursesplus.com/secrets-of-the-occult",
    },
  ],
} as const satisfies GreatCourse
