import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const askADogTrainer = {
  id: "019db533-f39e-766d-ba4b-560e1cccbac1",
  type: "page-type/great-course",
  slug: "ask-a-dog-trainer",
  title: "Ask a Dog Trainer",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 10.2,
  ownProgress: 10.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ask-a-dog-trainer",
      externalLink: "https://www.thegreatcoursesplus.com/ask-a-dog-trainer",
    },
  ],
} as const satisfies GreatCourse
