import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const urbanLegendsExplained = {
  id: "019db533-f398-7381-b91b-99afb7abc36d",
  type: "great-course",
  slug: "urban-legends-explained",
  title: "Urban Legends Explained",
  status: "not-started",
  unit: "minutes",
  ownLength: 322.8,
  ownProgress: 0,
  partOfCollections: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "urban-legends-explained",
  externalLink: "https://www.thegreatcoursesplus.com/urban-legends-explained",
} as const satisfies GreatCourse
