import type { GreatCourse } from "../../great-course.page-type.ts"

export const aNewHistoryOfTheAmericanSouth = {
  id: "019db533-f39f-7f97-9727-de4c55ebca91",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "a-new-history-of-the-american-south",
  title: "A New History of the American South",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 652.8,
  ownProgress: 652.8,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "a-new-history-of-the-american-south",
  externalLink: "https://www.thegreatcoursesplus.com/a-new-history-of-the-american-south",
} as const satisfies GreatCourse
