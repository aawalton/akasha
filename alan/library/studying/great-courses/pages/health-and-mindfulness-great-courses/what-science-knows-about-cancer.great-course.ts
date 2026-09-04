import type { GreatCourse } from "../../great-course.page-type.ts"

export const whatScienceKnowsAboutCancer = {
  id: "019db533-f3a0-759f-8dac-db99f3662787",
  pageTypeSlug: "great-course",
  slug: "what-science-knows-about-cancer",
  title: "What Science Knows about Cancer",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 750,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "what-science-knows-about-cancer",
  externalLink: "https://www.thegreatcoursesplus.com/what-science-knows-about-cancer",
} as const satisfies GreatCourse
