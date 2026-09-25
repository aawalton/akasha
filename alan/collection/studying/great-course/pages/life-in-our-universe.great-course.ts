import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeInOurUniverse = {
  id: "019db533-f39f-72d3-96d3-183e13aa4b0a",
  type: "page-type/great-course",
  slug: "life-in-our-universe",
  title: "Life in Our Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 728.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "life-in-our-universe",
      externalLink: "https://www.thegreatcoursesplus.com/life-in-our-universe",
    },
  ],
} as const satisfies GreatCourse
