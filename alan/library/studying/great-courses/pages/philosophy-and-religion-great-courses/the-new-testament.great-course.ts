import type { GreatCourse } from "../../great-course.page-type.ts"

export const theNewTestament = {
  id: "019db533-f39e-79d9-9736-f652a0641dfb",
  pageTypeSlug: "great-course",
  slug: "the-new-testament",
  title: "The New Testament",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-new-testament",
  externalLink: "https://www.thegreatcoursesplus.com/the-new-testament",
} as const satisfies GreatCourse
