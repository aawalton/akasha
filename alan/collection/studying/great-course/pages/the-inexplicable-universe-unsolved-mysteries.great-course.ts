import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theInexplicableUniverseUnsolvedMysteries = {
  id: "019db533-f39e-7de5-8ed5-825db47d943c",
  type: "page-type/great-course",
  slug: "the-inexplicable-universe-unsolved-mysteries",
  title: "The Inexplicable Universe: Unsolved Mysteries",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 193.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-inexplicable-universe-unsolved-mysteries",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-inexplicable-universe-unsolved-mysteries",
    },
  ],
} as const satisfies GreatCourse
