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
      externalLink: "https://plus.thegreatcourses.com/mindfulness-for-the-workplace",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
