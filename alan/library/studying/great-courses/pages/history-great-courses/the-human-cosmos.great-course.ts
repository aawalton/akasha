import type { GreatCourse } from "../../great-course.page-type.ts"

export const theHumanCosmos = {
  id: "019db533-f39f-7bd3-b6f6-bd5bd26a9a2d",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-human-cosmos",
  title: "The Human Cosmos",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 69,
  ownProgress: 69,
  partOfCollections: ["all-great-courses", "history-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-human-cosmos",
  externalLink: "https://www.thegreatcoursesplus.com/the-human-cosmos",
} as const satisfies GreatCourse
