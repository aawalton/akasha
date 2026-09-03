import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAgingBrain = {
  id: "019db533-f3a0-76d3-bef7-100b299ae9dc",
  pageTypeSlug: "great-course",
  slug: "the-aging-brain",
  title: "The Aging Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 382.2,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "learning-paths-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-aging-brain",
  externalLink: "https://www.thegreatcoursesplus.com/the-aging-brain",
} as const satisfies GreatCourse
