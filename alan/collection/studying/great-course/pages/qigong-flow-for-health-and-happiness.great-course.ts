import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const qigongFlowForHealthAndHappiness = {
  id: "019db533-f3a0-7885-b492-770f925d545f",
  type: "page-type/great-course",
  slug: "qigong-flow-for-health-and-happiness",
  title: "Qigong Flow for Health and Happiness",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 567.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "qigong-flow-for-health-and-happiness",
      externalLink: "https://www.thegreatcoursesplus.com/qigong-flow-for-health-and-happiness",
    },
  ],
} as const satisfies GreatCourse
