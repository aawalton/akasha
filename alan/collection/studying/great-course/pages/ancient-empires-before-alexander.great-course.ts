import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ancientEmpiresBeforeAlexander = {
  id: "019db533-f388-70ed-b0a6-01efa434d0de",
  type: "page-type/great-course",
  slug: "ancient-empires-before-alexander",
  title: "Ancient Empires before Alexander",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098.816667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ancient-empires-before-alexander",
      externalLink: "https://www.thegreatcoursesplus.com/ancient-empires-before-alexander",
    },
  ],
} as const satisfies GreatCourse
