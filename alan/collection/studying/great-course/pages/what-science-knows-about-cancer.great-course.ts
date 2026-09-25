import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whatScienceKnowsAboutCancer = {
  id: "019db533-f3a0-759f-8dac-db99f3662787",
  type: "page-type/great-course",
  slug: "what-science-knows-about-cancer",
  title: "What Science Knows about Cancer",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 750,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "what-science-knows-about-cancer",
      externalLink: "https://www.thegreatcoursesplus.com/what-science-knows-about-cancer",
    },
  ],
} as const satisfies GreatCourse
