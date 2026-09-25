import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const decodingTheSecretsOfEgyptianHieroglyphs = {
  id: "019db533-f39f-7eb7-943e-b9e32672580b",
  type: "page-type/great-course",
  slug: "decoding-the-secrets-of-egyptian-hieroglyphs",
  title: "Decoding the Secrets of Egyptian Hieroglyphs",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 753.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "decoding-the-secrets-of-egyptian-hieroglyphs",
      externalLink:
        "https://www.thegreatcoursesplus.com/decoding-the-secrets-of-egyptian-hieroglyphs",
    },
  ],
} as const satisfies GreatCourse
