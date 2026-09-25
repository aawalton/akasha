import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const natureInWatercolorPaintingTrees = {
  id: "019db533-f398-7376-8d64-deb766fd64f5",
  type: "page-type/great-course",
  slug: "nature-in-watercolor-painting-trees",
  title: "Nature in Watercolor: Painting Trees",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 151.2,
  ownProgress: 151.2,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "nature-in-watercolor-painting-trees",
      externalLink: "https://www.thegreatcoursesplus.com/nature-in-watercolor-painting-trees",
    },
  ],
} as const satisfies GreatCourse
