import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const artAndCraftOfMathematicalProblemSolving = {
  id: "019db533-f3a0-7479-a406-863f03a2cced",
  type: "page-type/great-course",
  slug: "art-and-craft-of-mathematical-problem-solving",
  title: "Art and Craft of Mathematical Problem Solving",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 734.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "art-and-craft-of-mathematical-problem-solving",
      externalLink:
        "https://www.thegreatcoursesplus.com/art-and-craft-of-mathematical-problem-solving",
    },
  ],
} as const satisfies GreatCourse
