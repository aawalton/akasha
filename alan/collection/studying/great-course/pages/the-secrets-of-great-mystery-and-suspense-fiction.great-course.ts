import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSecretsOfGreatMysteryAndSuspenseFiction = {
  id: "019db533-f39e-777d-b7da-53f2d90d795c",
  type: "page-type/great-course",
  slug: "the-secrets-of-great-mystery-and-suspense-fiction",
  title: "The Secrets of Great Mystery and Suspense Fiction",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1138.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-secrets-of-great-mystery-and-suspense-fiction",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-secrets-of-great-mystery-and-suspense-fiction",
    },
  ],
} as const satisfies GreatCourse
