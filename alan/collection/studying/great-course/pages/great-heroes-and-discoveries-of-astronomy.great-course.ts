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
      externalLink: "https://www.thegreatcoursesplus.com/great-heroes-and-discoveries-of-astronomy",
    },
  ],
} as const satisfies GreatCourse
