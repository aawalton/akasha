import type { GreatCourse } from "../../great-course.page-type.ts"

export const penAndInkEssentials = {
  id: "019db533-f39f-74cd-ae64-5278d998b7bb",
  pageTypeSlug: "great-course",
  slug: "pen-and-ink-essentials",
  title: "Pen & Ink Essentials",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 140.4,
  ownProgress: 140.4,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "pen-ink-essentials",
  externalLink: "https://www.thegreatcoursesplus.com/pen-ink-essentials",
} as const satisfies GreatCourse
