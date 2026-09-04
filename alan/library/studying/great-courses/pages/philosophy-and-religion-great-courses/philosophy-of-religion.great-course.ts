import type { GreatCourse } from "../../great-course.page-type.ts"

export const philosophyOfReligion = {
  id: "019db533-f39e-7a46-bd3d-351c8ecde7ba",
  pageTypeSlug: "great-course",
  slug: "philosophy-of-religion",
  title: "Philosophy of Religion",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1097.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "philosophy-of-religion",
  externalLink: "https://www.thegreatcoursesplus.com/philosophy-of-religion",
} as const satisfies GreatCourse
