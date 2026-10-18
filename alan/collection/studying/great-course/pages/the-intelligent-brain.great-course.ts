import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theIntelligentBrain = {
  id: "019db533-f39f-71b5-ac8f-3435ff4d52d3",
  type: "page-type/great-course",
  slug: "the-intelligent-brain",
  title: "The Intelligent Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 526.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-intelligent-brain",
      externalLink: "https://plus.thegreatcourses.com/the-intelligent-brain",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
