import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const examiningTheBigQuestionsOfTime = {
  id: "019db533-f39e-7cce-816a-eac85c693998",
  type: "page-type/great-course",
  slug: "examining-the-big-questions-of-time",
  title: "Examining the Big Questions of Time",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 316.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "examining-the-big-questions-of-time",
      externalLink: "https://www.thegreatcoursesplus.com/examining-the-big-questions-of-time",
    },
  ],
} as const satisfies GreatCourse
