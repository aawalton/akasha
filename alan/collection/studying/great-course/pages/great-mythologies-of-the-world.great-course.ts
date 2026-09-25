import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMythologiesOfTheWorld = {
  id: "019db533-f39e-78ed-8606-57806860cf4e",
  type: "page-type/great-course",
  slug: "great-mythologies-of-the-world",
  title: "Great Mythologies of the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1905.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-mythologies-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/great-mythologies-of-the-world",
    },
  ],
} as const satisfies GreatCourse
