import type { GreatCourse } from "../../great-course.page-type.ts"

export const stAugustineSConfessions = {
  id: "019db533-f39e-7c63-863c-b176e0067cdd",
  pageTypeSlug: "great-course",
  slug: "st-augustine-s-confessions",
  title: "St. Augustine's Confessions",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 729.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "st-augustines-confessions",
  externalLink: "https://www.thegreatcoursesplus.com/st-augustines-confessions",
} as const satisfies GreatCourse
