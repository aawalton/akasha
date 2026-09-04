import type { GreatCourse } from "../../great-course.page-type.ts"

export const handEmbroidery = {
  id: "019db533-f39e-7746-b5e4-30a18a126c38",
  pageTypeSlug: "great-course",
  slug: "hand-embroidery",
  title: "Hand Embroidery",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 199.2,
  ownProgress: 199.2,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "hand-embroidery",
  externalLink: "https://www.thegreatcoursesplus.com/hand-embroidery",
} as const satisfies GreatCourse
