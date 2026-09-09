import type { GreatCourse } from "../great-course.page-type.ts"

export const charlemagneFatherOfEurope = {
  id: "019db533-f39f-7e43-8bea-c547a5f7f45f",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "charlemagne-father-of-europe",
  title: "Charlemagne: Father of Europe",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 387.6,
  ownProgress: 387.6,
  partOfCollections: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "charlemagne-father-of-europe",
  externalLink: "https://www.thegreatcoursesplus.com/charlemagne-father-of-europe",
} as const satisfies GreatCourse
