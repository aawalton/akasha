import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatBattlesOfTheAncientWorld = {
  id: "019db533-f3a0-7175-9a72-04a148bb9393",
  pageTypeSlug: "great-course",
  slug: "great-battles-of-the-ancient-world",
  title: "Great Battles of the Ancient World",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 745.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "great-battles-of-the-ancient-world",
  externalLink: "https://www.thegreatcoursesplus.com/great-battles-of-the-ancient-world",
} as const satisfies GreatCourse
