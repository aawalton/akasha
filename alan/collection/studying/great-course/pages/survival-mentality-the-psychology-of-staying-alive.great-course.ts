import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const survivalMentalityThePsychologyOfStayingAlive = {
  id: "019db533-f39e-7e0e-bc1a-22ea454c4c3e",
  type: "page-type/great-course",
  slug: "survival-mentality-the-psychology-of-staying-alive",
  title: "Survival Mentality: The Psychology of Staying Alive",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 360.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "survival-mentality-the-psychology-of-staying-alive",
      externalLink:
        "https://www.thegreatcoursesplus.com/survival-mentality-the-psychology-of-staying-alive",
    },
  ],
} as const satisfies GreatCourse
