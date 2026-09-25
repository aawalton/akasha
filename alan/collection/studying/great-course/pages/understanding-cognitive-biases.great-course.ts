import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingCognitiveBiases = {
  id: "019db533-f39e-7bf4-9d50-e448405a2c1d",
  type: "page-type/great-course",
  slug: "understanding-cognitive-biases",
  title: "Understanding Cognitive Biases",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 647.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-cognitive-biases",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-cognitive-biases",
    },
  ],
} as const satisfies GreatCourse
