import type { GreatCourse } from "../great-course.page-type.ts"

export const theGreekAndPersianWars = {
  id: "019db533-f3a0-708c-a3f3-68afed527202",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-greek-and-persian-wars",
  title: "The Greek and Persian Wars",
  status: "not-started",
  unit: "minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-greek-and-persian-wars",
  externalLink: "https://www.thegreatcoursesplus.com/the-greek-and-persian-wars",
} as const satisfies GreatCourse
