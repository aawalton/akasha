import type { GreatCourse } from "../../great-course.page-type.ts"

export const masteringTaiChi = {
  id: "019db533-f3a0-77dc-bcc2-3e24f373bfb8",
  pageTypeSlug: "great-course",
  slug: "mastering-tai-chi",
  title: "Mastering Tai Chi",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 751.8,
  ownProgress: 751.8,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "mastering-tai-chi",
  externalLink: "https://www.thegreatcoursesplus.com/mastering-tai-chi",
} as const satisfies GreatCourse
