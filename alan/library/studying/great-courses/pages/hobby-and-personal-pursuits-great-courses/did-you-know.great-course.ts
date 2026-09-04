import type { GreatCourse } from "../../great-course.page-type.ts"

export const didYouKnow = {
  id: "019db533-f39e-763e-8359-11be06a56c45",
  pageTypeSlug: "great-course",
  slug: "did-you-know",
  title: "Did You Know?",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 129,
  ownProgress: 129,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "did-you-know",
  externalLink: "https://www.thegreatcoursesplus.com/did-you-know",
} as const satisfies GreatCourse
