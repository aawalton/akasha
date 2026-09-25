import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const practicalGuideToSuicidePrevention = {
  id: "019db533-f3a0-77a7-96d3-d1f4294543b0",
  type: "page-type/great-course",
  slug: "practical-guide-to-suicide-prevention",
  title: "Practical Guide to Suicide Prevention",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 46.2,
  ownProgress: 46.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "practical-guide-to-suicide-prevention",
      externalLink: "https://www.thegreatcoursesplus.com/practical-guide-to-suicide-prevention",
    },
  ],
} as const satisfies GreatCourse
