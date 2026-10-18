import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatHeroesAndDiscoveriesOfAstronomy = {
  id: "019db533-f39e-7eb9-b104-9de8d6d4664f",
  type: "page-type/great-course",
  slug: "great-heroes-and-discoveries-of-astronomy",
  title: "Great Heroes and Discoveries of Astronomy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 640.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-heroes-and-discoveries-of-astronomy",
      externalLink: "https://plus.thegreatcourses.com/great-heroes-and-discoveries-of-astronomy",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
