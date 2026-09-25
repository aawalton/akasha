import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const urbanLegendsExplained = {
  id: "019db533-f398-7381-b91b-99afb7abc36d",
  type: "page-type/great-course",
  slug: "urban-legends-explained",
  title: "Urban Legends Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 322.8,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "urban-legends-explained",
      externalLink: "https://www.thegreatcoursesplus.com/urban-legends-explained",
    },
  ],
} as const satisfies GreatCourse
