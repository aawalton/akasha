import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningItalianStepByStepAndRegionByRegion = {
  id: "019db533-f39f-7517-98c5-74ba665cf7fd",
  type: "page-type/great-course",
  slug: "learning-italian-step-by-step-and-region-by-region",
  title: "Learning Italian: Step by Step and Region by Region",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 734.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-italian-step-by-step-and-region-by-region",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-italian-step-by-step-and-region-by-region",
    },
  ],
} as const satisfies GreatCourse
