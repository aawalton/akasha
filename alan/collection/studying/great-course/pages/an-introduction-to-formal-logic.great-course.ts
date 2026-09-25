import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const anIntroductionToFormalLogic = {
  id: "019db533-f3a0-79e3-b9bc-f0f2e2a6a5cf",
  type: "page-type/great-course",
  slug: "an-introduction-to-formal-logic",
  title: "An Introduction to Formal Logic",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 742.8,
  ownProgress: 742.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/mathematics-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "an-introduction-to-formal-logic",
      externalLink: "https://www.thegreatcoursesplus.com/an-introduction-to-formal-logic",
    },
  ],
} as const satisfies GreatCourse
