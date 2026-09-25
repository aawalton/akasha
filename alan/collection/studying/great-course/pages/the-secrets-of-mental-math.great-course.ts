import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSecretsOfMentalMath = {
  id: "019db533-f3a0-7264-a510-e706c5fe6895",
  type: "page-type/great-course",
  slug: "the-secrets-of-mental-math",
  title: "The Secrets of Mental Math",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 403.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-secrets-of-mental-math",
      externalLink: "https://www.thegreatcoursesplus.com/the-secrets-of-mental-math",
    },
  ],
} as const satisfies GreatCourse
