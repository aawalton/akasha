import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBigQuestionsOfPhilosophy = {
  id: "019db533-f39e-7a5d-9c1a-9ab4b1c750a6",
  type: "page-type/great-course",
  slug: "the-big-questions-of-philosophy",
  title: "The Big Questions of Philosophy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1154.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-big-questions-of-philosophy",
      externalLink: "https://www.thegreatcoursesplus.com/the-big-questions-of-philosophy",
    },
  ],
} as const satisfies GreatCourse
