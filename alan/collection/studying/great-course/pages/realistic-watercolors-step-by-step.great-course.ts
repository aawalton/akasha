import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const realisticWatercolorsStepByStep = {
  id: "019db533-f39f-7872-820d-b2837e29da41",
  type: "page-type/great-course",
  slug: "realistic-watercolors-step-by-step",
  title: "Realistic Watercolors Step by Step",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 162,
  ownProgress: 162,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "realistic-watercolors-step-by-step",
      externalLink: "https://www.thegreatcoursesplus.com/realistic-watercolors-step-by-step",
    },
  ],
} as const satisfies GreatCourse
