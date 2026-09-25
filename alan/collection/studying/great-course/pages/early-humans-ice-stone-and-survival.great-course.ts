import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const earlyHumansIceStoneAndSurvival = {
  id: "019db533-f39f-7ee1-bacc-b50da475fdf7",
  type: "page-type/great-course",
  slug: "early-humans-ice-stone-and-survival",
  title: "Early Humans: Ice, Stone, and Survival",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 471,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "early-humans-ice-stone-and-survival",
      externalLink: "https://www.thegreatcoursesplus.com/early-humans-ice-stone-and-survival",
    },
  ],
} as const satisfies GreatCourse
