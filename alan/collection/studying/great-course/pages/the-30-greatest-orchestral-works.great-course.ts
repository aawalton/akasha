import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const the30GreatestOrchestralWorks = {
  id: "019db533-f3a0-72fe-a9e6-cc6cb6bffbc4",
  type: "page-type/great-course",
  slug: "the-30-greatest-orchestral-works",
  title: "The 30 Greatest Orchestral Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1491,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-30-greatest-orchestral-works",
      externalLink: "https://plus.thegreatcourses.com/the-30-greatest-orchestral-works",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
