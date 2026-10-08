import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRiseOfHumansGreatScientificDebates = {
  id: "019db533-f39e-7d7c-8d68-72efb23aa9d0",
  type: "page-type/great-course",
  slug: "the-rise-of-humans-great-scientific-debates",
  title: "The Rise of Humans: Great Scientific Debates",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 776.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-rise-of-humans-great-scientific-debates",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-rise-of-humans-great-scientific-debates",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
