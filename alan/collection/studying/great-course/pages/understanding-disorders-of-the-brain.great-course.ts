import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingDisordersOfTheBrain = {
  id: "019db533-f39f-7195-a7ed-b461d2e06738",
  type: "page-type/great-course",
  slug: "understanding-disorders-of-the-brain",
  title: "Understanding Disorders of the Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 696.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-disorders-of-the-brain",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-disorders-of-the-brain",
    },
  ],
} as const satisfies GreatCourse
