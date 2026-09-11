import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const theIndustrialRevolution = {
  id: "019db533-f39f-7ce6-8726-306d991b91f9",
  type: "great-course",
  slug: "the-industrial-revolution",
  title: "The Industrial Revolution",
  status: "not-started",
  unit: "minutes",
  ownLength: 1100.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-industrial-revolution",
  externalLink: "https://www.thegreatcoursesplus.com/the-industrial-revolution",
} as const satisfies GreatCourse
