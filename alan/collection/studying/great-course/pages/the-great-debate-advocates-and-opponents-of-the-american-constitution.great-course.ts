import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatDebateAdvocatesAndOpponentsOfTheAmericanConstitution = {
  id: "019db533-f39f-7db9-8024-8aa74e7e7cde",
  type: "page-type/great-course",
  slug: "the-great-debate-advocates-and-opponents-of-the-american-constitution",
  title: "The Great Debate: Advocates and Opponents of the American Constitution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 378.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-debate-advocates-and-opponents-of-the-american-constitution",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-debate-advocates-and-opponents-of-the-american-constitution",
    },
  ],
} as const satisfies GreatCourse
