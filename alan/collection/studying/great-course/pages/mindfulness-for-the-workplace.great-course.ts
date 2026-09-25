import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindfulnessForTheWorkplace = {
  id: "019db533-f3a0-7772-9eef-d80caceab6c8",
  type: "page-type/great-course",
  slug: "mindfulness-for-the-workplace",
  title: "Mindfulness for the Workplace",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 289.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mindfulness-for-the-workplace",
      externalLink: "https://www.thegreatcoursesplus.com/mindfulness-for-the-workplace",
    },
  ],
} as const satisfies GreatCourse
