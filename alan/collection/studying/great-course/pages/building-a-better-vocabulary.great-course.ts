import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const buildingABetterVocabulary = {
  id: "019db533-f39e-78d6-bee3-6578e8ed08b6",
  type: "page-type/great-course",
  slug: "building-a-better-vocabulary",
  title: "Building a Better Vocabulary",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1131,
  ownProgress: 1131,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "building-a-better-vocabulary",
      externalLink: "https://plus.thegreatcourses.com/building-a-better-vocabulary",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
