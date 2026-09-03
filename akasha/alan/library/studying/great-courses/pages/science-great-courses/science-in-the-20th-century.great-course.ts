import type { GreatCourse } from "../../great-course.page-type.ts"

export const scienceInThe20thCentury = {
  id: "019db533-f39e-7ece-bc77-fc95c2fb0db5",
  pageTypeSlug: "great-course",
  slug: "science-in-the-20th-century",
  title: "Science in the 20th Century",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1095,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "science-in-the-20th-century",
  externalLink: "https://www.thegreatcoursesplus.com/science-in-the-20th-century",
} as const satisfies GreatCourse
