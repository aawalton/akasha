import type { GreatCourse } from "../../great-course.page-type.ts"

export const blackInventors = {
  id: "019db533-f3a0-74ff-82df-7bb550784d87",
  pageTypeSlug: "great-course",
  slug: "black-inventors",
  title: "Black Inventors",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 30.6,
  ownProgress: 30.6,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "black-inventors",
  externalLink: "https://www.thegreatcoursesplus.com/black-inventors",
} as const satisfies GreatCourse
