import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const livingTheFrenchRevolutionAndTheAgeOfNapoleon = {
  id: "019db533-f39f-7d4f-a26c-bdded6d85cf9",
  type: "page-type/great-course",
  slug: "living-the-french-revolution-and-the-age-of-napoleon",
  title: "Living the French Revolution and the Age of Napoleon",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1489.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "living-the-french-revolution-and-the-age-of-napoleon",
      externalLink:
        "https://www.thegreatcoursesplus.com/living-the-french-revolution-and-the-age-of-napoleon",
    },
  ],
} as const satisfies GreatCourse
