import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToMachineLearning = {
  id: "019db533-f39f-72b3-9d23-f53c876fee01",
  type: "page-type/great-course",
  slug: "introduction-to-machine-learning",
  title: "Introduction to Machine Learning",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 726,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-machine-learning",
      externalLink: "https://www.thegreatcoursesplus.com/introduction-to-machine-learning",
    },
  ],
} as const satisfies GreatCourse
