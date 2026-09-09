import type { GreatCourse } from "../great-course.page-type.ts"

export const theUnitedStatesSince911 = {
  id: "019db533-f39f-7cd0-9216-4e4cd006b108",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-united-states-since-9-11",
  title: "The United States since 9/11",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 73.2,
  ownProgress: 73.2,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-united-states-since-911",
  externalLink: "https://www.thegreatcoursesplus.com/the-united-states-since-911",
} as const satisfies GreatCourse
