import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const communismInDeclineFromSputnikToGorbachev = {
  id: "019db533-f3a0-71b4-84e9-284f28fe0a5d",
  type: "page-type/great-course",
  slug: "communism-in-decline-from-sputnik-to-gorbachev",
  title: "Communism in Decline: From Sputnik to Gorbachev",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 402,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "communism-in-decline-from-sputnik-to-gorbachev",
      externalLink:
        "https://www.thegreatcoursesplus.com/communism-in-decline-from-sputnik-to-gorbachev",
    },
  ],
} as const satisfies GreatCourse
