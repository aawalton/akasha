import type { GreatCourse } from "../../great-course.page-type.ts"

export const knitSocksTwoAtATime = {
  id: "019db533-f39e-75e2-972a-29a1b592479c",
  pageTypeSlug: "great-course",
  slug: "knit-socks-two-at-a-time",
  title: "Knit Socks: Two at a Time!",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 126,
  ownProgress: 126,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "knit-socks-two-at-a-time",
  externalLink: "https://www.thegreatcoursesplus.com/knit-socks-two-at-a-time",
} as const satisfies GreatCourse
