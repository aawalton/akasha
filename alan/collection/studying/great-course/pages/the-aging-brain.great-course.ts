import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAgingBrain = {
  id: "019db533-f3a0-76d3-bef7-100b299ae9dc",
  type: "page-type/great-course",
  slug: "the-aging-brain",
  title: "The Aging Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 382.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-aging-brain",
      externalLink: "https://plus.thegreatcourses.com/the-aging-brain",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
