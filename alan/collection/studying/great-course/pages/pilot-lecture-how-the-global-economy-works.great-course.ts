import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureHowTheGlobalEconomyWorks = {
  id: "019db533-f39e-73fa-9671-c22d6e1a1152",
  type: "page-type/great-course",
  slug: "pilot-lecture-how-the-global-economy-works",
  title: "Pilot Lecture: How the Global Economy Works",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 31.2,
  ownProgress: 31.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-how-the-global-economy-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-how-the-global-economy-works",
    },
  ],
} as const satisfies GreatCourse
