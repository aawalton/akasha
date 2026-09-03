import type { GreatCourse } from "../../great-course.page-type.ts"

export const theWorldSGreatestChurches = {
  id: "019db533-f39f-77dd-822e-72c784ee6af4",
  pageTypeSlug: "great-course",
  slug: "the-world-s-greatest-churches",
  title: "The World's Greatest Churches",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 757.8,
  ownProgress: 757.8,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "history-great-courses",
    "philosophy-and-religion-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-worlds-greatest-churches",
  externalLink: "https://www.thegreatcoursesplus.com/the-worlds-greatest-churches",
} as const satisfies GreatCourse
