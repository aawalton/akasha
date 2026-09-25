import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingNonverbalCommunication = {
  id: "019db533-f39e-72e0-9192-859b07268573",
  type: "page-type/great-course",
  slug: "understanding-nonverbal-communication",
  title: "Understanding Nonverbal Communication",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 370.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-nonverbal-communication",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-nonverbal-communication",
    },
  ],
} as const satisfies GreatCourse
