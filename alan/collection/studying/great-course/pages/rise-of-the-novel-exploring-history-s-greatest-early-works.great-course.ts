import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const riseOfTheNovelExploringHistorySGreatestEarlyWorks = {
  id: "019db533-f39e-784e-80ff-97d3a0cad081",
  type: "page-type/great-course",
  slug: "rise-of-the-novel-exploring-history-s-greatest-early-works",
  title: "Rise of the Novel: Exploring History’s Greatest Early Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 735,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "rise-of-the-novel-eploring-historys-greatest-early-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/rise-of-the-novel-eploring-historys-greatest-early-works",
    },
  ],
} as const satisfies GreatCourse
