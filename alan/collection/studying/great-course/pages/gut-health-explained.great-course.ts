import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const gutHealthExplained = {
  id: "019db533-f3a0-7924-bdb1-f7e088d8d6ff",
  type: "page-type/great-course",
  slug: "gut-health-explained",
  title: "Gut Health Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 259.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "gut-health-explained",
      externalLink: "https://plus.thegreatcourses.com/gut-health-explained",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
