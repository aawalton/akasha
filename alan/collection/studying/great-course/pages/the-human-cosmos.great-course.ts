import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHumanCosmos = {
  id: "019db533-f39f-7bd3-b6f6-bd5bd26a9a2d",
  type: "page-type/great-course",
  slug: "the-human-cosmos",
  title: "The Human Cosmos",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 69,
  ownProgress: 69,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-human-cosmos",
      externalLink: "https://www.thegreatcoursesplus.com/the-human-cosmos",
    },
  ],
} as const satisfies GreatCourse
