import type { GreatCourse } from "../../great-course.page-type.ts"

export const fundamentalsOfPhotography = {
  id: "019db533-f39f-76a0-9570-95babf1c64f0",
  pageTypeSlug: "great-course",
  slug: "fundamentals-of-photography",
  title: "Fundamentals of Photography",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 756,
  ownProgress: 756,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "fundamentals-of-photography",
  externalLink: "https://www.thegreatcoursesplus.com/fundamentals-of-photography",
} as const satisfies GreatCourse
