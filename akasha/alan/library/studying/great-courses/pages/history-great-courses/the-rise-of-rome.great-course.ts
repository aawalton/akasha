import type { GreatCourse } from "../../great-course.page-type.ts"

export const theRiseOfRome = {
  id: "019db533-f39f-7cdb-bbbd-ba4ac2b01c87",
  pageTypeSlug: "great-course",
  slug: "the-rise-of-rome",
  title: "The Rise of Rome",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 733.8,
  ownProgress: 733.8,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "rise-of-rome",
  externalLink: "https://www.thegreatcoursesplus.com/rise-of-rome",
} as const satisfies GreatCourse
