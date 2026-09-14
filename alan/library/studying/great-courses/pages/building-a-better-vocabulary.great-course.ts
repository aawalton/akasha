import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const buildingABetterVocabulary = {
  id: "019db533-f39e-78d6-bee3-6578e8ed08b6",
  type: "great-course",
  slug: "building-a-better-vocabulary",
  title: "Building a Better Vocabulary",
  status: "completed",
  rank: "C",
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
      externalLink: "https://www.thegreatcoursesplus.com/building-a-better-vocabulary",
    },
  ],
} as const satisfies GreatCourse
