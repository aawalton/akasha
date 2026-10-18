import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theLearningBrain = {
  id: "019db533-f39e-7dc6-9ca2-7399c3846788",
  type: "page-type/great-course",
  slug: "the-learning-brain",
  title: "The Learning Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 752.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-learning-brain",
      externalLink: "https://plus.thegreatcourses.com/the-learning-brain",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
