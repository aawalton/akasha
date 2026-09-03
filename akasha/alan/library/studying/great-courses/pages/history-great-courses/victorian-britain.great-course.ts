import type { GreatCourse } from "../../great-course.page-type.ts"

export const victorianBritain = {
  id: "019db533-f39f-7b33-a5fe-b74a5d754099",
  pageTypeSlug: "great-course",
  slug: "victorian-britain",
  title: "Victorian Britain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1107,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "victorian-britain",
  externalLink: "https://www.thegreatcoursesplus.com/victorian-britain",
} as const satisfies GreatCourse
