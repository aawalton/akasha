import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindBendingMathRiddlesAndParadoxes = {
  id: "019db533-f3a0-7846-82db-1c5e570aa9bf",
  type: "page-type/great-course",
  slug: "mind-bending-math-riddles-and-paradoxes",
  title: "Mind-Bending Math: Riddles and Paradoxes",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mind-bending-math-riddles-and-paradoxes",
      externalLink: "https://www.thegreatcoursesplus.com/mind-bending-math-riddles-and-paradoxes",
    },
  ],
} as const satisfies GreatCourse
