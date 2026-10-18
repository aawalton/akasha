import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const medicalNewsExplained = {
  id: "019db533-f3a0-77e6-b8dc-a36b9981a2ed",
  type: "page-type/great-course",
  slug: "medical-news-explained",
  title: "Medical News Explained",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 72,
  ownProgress: 72,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "medical-news-explained",
      externalLink: "https://plus.thegreatcourses.com/medical-news-explained",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
